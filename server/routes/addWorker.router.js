const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in Add Worker Router');
    let newWorker = req.body;
    //let user_id = req.user.user_id;
    console.log('New Worker is:', newWorker);
    //console.log('User is:', user_id);
    const sqlText = `INSERT INTO "farm_registry" ("farm_name", "address", "city", "state", "zip_code", "user_id") VALUES ($1, $2, $3, $4, $5, $6)`
    pool.query(sqlText, [newFarm.farm_name, newFarm.address, newFarm.city, newFarm.state, newFarm.zip_code, user_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('ERROR in SETUPFARM POST', error);
            res.sendStatus(500);
        })
})




module.exports = router;