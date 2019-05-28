const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

router.get('/', (req, res) => {
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


module.exports = router;