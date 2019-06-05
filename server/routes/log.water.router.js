const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/inspect', rejectUnauthenticated, (req,res) =>{
    console.log('IN ADD WATER INSPECT LOG');
    const newWaterInspectLog = req.body;
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `INSERT INTO "water_inspection" ("inspection_date", "inspection_water_source", "distribution", "observation", "inspection_corrective_action", "inspection_signature", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7);`
    pool.query(sqlQuery, [newWaterInspectLog.inspection_date, newWaterInspectLog.inspection_water_source, newWaterInspectLog.distribution, newWaterInspectLog.observation, newWaterInspectLog.inspection_corrective_action, newWaterInspectLog.inspection_signature, harvest_year_id ])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`ERROR in WATER INSPECT LOG POST`, error);
        res.sendStatus(500);
    })

})


router.post('/treat', rejectUnauthenticated, (req,res) =>{
    console.log('IN ADD WATER TREAT LOG');
    const newWaterTreatLog = req.body;
    const harvest_year_id = req.user.current_harvest_year;
    let sqlQuery = `INSERT INTO "water_treatment" ("treatment_date", "farm_water_source_id", "water_ph", "water_temp", "turbidity", "sanitizer", "corrective_action", "treatment_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
    pool.query(sqlQuery, [newWaterTreatLog.treatment_date, newWaterTreatLog.farm_water_source_id, newWaterTreatLog.water_ph, newWaterTreatLog.water_temp, newWaterTreatLog.turbidity, newWaterTreatLog.sanitizer, newWaterTreatLog.corrective_action, newWaterTreatLog.treatment_sig, harvest_year_id ])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`ERROR in WATER TREAT LOG POST`, error);
        res.sendStatus(500);
    })

})
/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;