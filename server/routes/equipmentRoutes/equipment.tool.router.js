const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../../modules/authentication-middleware');

router.post('/new', (req, res) => {
  console.log(`in post `, req.body);
  
  let harvest_id = req.user.current_harvest_year;
  let sqlText = `INSERT INTO "farm_tool" ("farm_tool_name", "harvest_year_id") VALUES ($1, $2);`
  let values = [
    req.body.farm_tool_name,
    harvest_id
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added farm tool ');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in farm_tool post `, error);
      res.sendStatus(500);
    })
});

router.get('/', rejectUnauthenticated, (req, res) => {
  let harvestYear = req.user.current_harvest_year;
  let sqlQuery = `SELECT * FROM "farm_tool" WHERE "harvest_year_id" = $1;`
  pool.query(sqlQuery, [harvestYear])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Couldn't get data`, error);
      res.sendStatus(500);
    })
});

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'DELETE FROM "farm_tool" WHERE "farm_tool_id" = $1;';
  pool.query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error deleting equipment', error);
      res.sendStatus(500);
    });
});

module.exports = router;