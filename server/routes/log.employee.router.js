const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/add', (req,res) =>{
    console.log('IN ADD EMPLOYEE TRAINING LOG');
    const newEmployeeLog = req.body;
    console.log(req.body);
    let sqlQuery = `INSERT INTO "employee_training" ("topic", "person_id", "trainer_name", "date_trained", "employee_training_sig", "harvest_year_id") VALUES ($1, $2, $3, $4, $5, $6);`
    pool.query(sqlQuery, [newEmployeeLog.topic, newEmployeeLog.person_id, newEmployeeLog.trainer_name, newEmployeeLog.date_trained, newEmployeeLog.employee_training_sig, req.user.current_harvest_year])
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`ERROR in ADD EMPLOYEE TRAINING LOG POST`, error);
        res.sendStatus(500);
    })

})


module.exports = router;