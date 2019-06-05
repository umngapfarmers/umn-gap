const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET RECORD EMPLOYEE TRAINING')
    const harvest_year_id = req.query.harvest_year_id;
    console.log(harvest_year_id);
    let sqlQuery = `SELECT "employee_training"."topic", "employee_training"."employee_training_id", "employee_training"."trainer_name", "employee_training"."date_trained", "employee_training"."employee_training_sig", "person"."person_first", "person"."person_last" FROM "employee_training" JOIN "person" ON "employee_training"."person_id" = "person"."person_id" WHERE "employee_training"."harvest_year_id" = $1 ORDER BY "employee_training"."date_trained" ASC`
    pool.query(sqlQuery, [harvest_year_id])
        .then((response) => {
            console.log(`RECORD EMPLOYEE TRAINING Response`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET RECORD EMPLOYEE TRAINING`, error);
            res.sendStatus(500);
        })
});



module.exports = router;