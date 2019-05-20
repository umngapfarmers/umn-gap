const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



// router.post('/', rejectUnauthenticated, (req,res) => {
//     console.log('in SERVER SETUPFARM');
//     let newFarm = req.body;
//     let user_id = req.user.user_id;
//     console.log('New Farm is:', newFarm);
//     console.log('User is:', user_id);
//     const sqlText= `INSERT INTO "farm_registry" ("farm_name", "address", "city", "state", "zip_code") VALUES ($1, $2, $3, $4, $5 )`
//     pool.query(sqlText, [newFarm.farm_name, newFarm.address, newFarm.city, newFarm.state, newFarm.zip_code, user_id])
//     .then( (result) => {
//         res.sendStatus(201);
//     })
//     .catch( (error) => {
//         console.log('ERROR in SETUPFARM POST', error);
//         res.sendStatus(500);
//     })
// })

router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
  
    try {
    //  console.log(req.body);
        console.log('in SERVER SETUPFARM');
        let newFarm = req.body;
        let user_id = req.user.user_id;
        console.log('New Farm is:', newFarm);
        console.log('User is:', user_id);
        
      farmQuery= `INSERT INTO "farm_registry" ("farm_name", "address", "city", "state", "zip_code") VALUES ($1, $2, $3, $4, $5) RETURNING farm_id`
      farmIdQuery = `INSERT INTO "user" ("farm_registry_id") VALUES ($1) WHERE "user_id" = $2;`;

      await client.query('BEGIN')
        const farmInsertResults = await client.query(farmQuery, [newFarm.farm_name, newFarm.address, newFarm.city, newFarm.state, newFarm.zip_code]);
        const farm_registry_id = farmInsertResults.rows[0].farm_id;
        console.log(farm_registry_id);
  
        const insertFarmId =  await client.query(farmIdQuery, [farm_registry_id, user_id]);
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST STUDENT', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });





module.exports = router;