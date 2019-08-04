const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../../modules/authentication-middleware');

router.post('/new', (req, res) => {
  console.log(`in post `, req.body);

  let harvest_id = req.user.current_harvest_year;
  let sqlText = `INSERT INTO "farm_pest" ("farm_pest_location", "harvest_year_id", "farm_pest_type") VALUES ($1, $2, $3);`
  let values = [
    req.body.farm_pest_location,
    harvest_id,
    req.body.farm_pest_type
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added farm pest ');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in farm_pest post `, error);
      res.sendStatus(500);
    })
});

router.get('/', rejectUnauthenticated, (req, res) => {
  let harvestYear = req.user.current_harvest_year;
  let sqlQuery = `SELECT * FROM "farm_pest" WHERE "harvest_year_id" = $1;`
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
  const queryText = 'DELETE FROM "farm_pest" WHERE "farm_pest_id" = $1;';
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