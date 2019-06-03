const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('IN GET ALL USERS')
    let sqlQuery = `SELECT "user"."user_id", "user"."username", "user"."user_status", "farm_registry"."farm_name" FROM "user" JOIN "farm_registry" ON "user"."farm_registry_id" = "farm_registry"."farm_id"`
    pool.query(sqlQuery)
        .then((response) => {
            console.log(`response all users`, response.rows);
            res.send(response.rows)  
        })
        .catch((error) => {
            console.log(`ERROR in GET ALL USERS`, error);
            res.sendStatus(500);
        })
});

router.put('/:id', rejectUnauthenticated, (req,res) => {
    console.log('in UPDATE USER');
    const updateUser = req.body
    const user_id = req.params.id;
    console.log(user_id);
    let sqlQuery =  `UPDATE "user" SET "user_status" = $1 WHERE "user_id" = $2;`;
    pool.query(sqlQuery, [updateUser.user_status, user_id])
    .then ((response) => {
        res.sendStatus(201);
    })
    .catch ((error)=> {
        console.log('ERROR IN USER UPDATE', error)
        res.sendStatus(500)
    })
})


module.exports = router;