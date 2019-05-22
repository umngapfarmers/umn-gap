const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/addHarvestYear', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    console.log('In HARVEST YEAR POST');
    const newHarvestYear = req.body;
    const farm_id = req.user.farm_registry_id;

          try {
          const harvest_year_query = `INSERT INTO "harvest_year" ("harvest_year", "farm_id") VALUES ($1, $2) returning harvest_id;`
          const usernameUpdateQuery=  `UPDATE "user" SET "current_harvest_year" = $1 WHERE "farm_registry_id" = $2;`;
          const personUpdateQuery = `UPDATE "person" SET "current_harvest_id" = $1 , "farm_id" = $2 WHERE "user_id" = $3;`;
          await client.query('BEGIN')
            
            const harvestInsertResults = await client.query(harvest_year_query,  [newHarvestYear.harvest_year, farm_id]);
            const current_harvest_year = harvestInsertResults.rows[0].harvest_id;
            console.log(current_harvest_year);
            
            const usernameInsertResults = await client.query(usernameUpdateQuery, [current_harvest_year, farm_id ]);
            const personInsertResults = await client.query(personUpdateQuery, [current_harvest_year, farm_id, req.user.user_id ]);
            console.log('currentHarvestYear is:', current_harvest_year, 'farm_id is:', farm_id);
            await client.query('COMMIT')
            res.sendStatus(201);
        } catch (error) {
            await client.query('ROLLBACK')
            console.log('Error In HARVEST YEAR POST', error);
            res.sendStatus(500);
        } finally {
            client.release()
      }
  });


// router.post('/addHarvestYear', rejectUnauthenticated, (req, res) => {
//     const newHarvestYear = req.body;
//     console.log(newHarvestYear);
//     const sqlText = `INSERT INTO "harvest_year" ("harvest_year", "farm_id") VALUES ($1, $2);`;

//     pool.query(sqlText, 
//         [ newHarvestYear.harvest_year, newHarvestYear.farm_id]
//     )
//         .then((result) => {
//             res.sendStatus(201);
//         })
//         .catch((error) => {
//             console.log(`ERROR in addHarvestYear POST`, error);
//             res.sendStatus(500);
//         });
// });


module.exports = router;