const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');



router.post('/new/farm_tool', (req, res) => {

  let sqlText = `INSERT INTO "farm_tool" ("farm_tool_name") VALUES ($1);`
  let values = [
    req.body.farm_tool_name
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added farm tool ', result.rows[0]);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in farm_tool post `, error);
      res.sendStatus(500);
    })
});

router.post('/new/thermometer', (req, res) => {

  let sqlText = `INSERT INTO "farm_thermometer" ("farm_thermometer_name") VALUES ($1);`
  let values = [
    req.body.farm_thermometer_name
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added thermometer', result.rows[0]);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in thermometer post `, error);
      res.sendStatus(500);
    })
});

router.post('/new/firstaid', (req, res) => {

  let sqlText = `INSERT INTO "farm_firstaid" ("farm_firstaid_location") VALUES ($1);`
  let values = [
    req.body.farm_firstaid_location
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added firstaid', result.rows[0]);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in firstaid post `, error);
      res.sendStatus(500);
    })
});

router.post('/new/pest', (req, res) => {

  let sqlText = `INSERT INTO "farm_pest" ("farm_pest_type", "farm_pest_location") VALUES ($1, $2);`
  let values = [
    req.body.farm_pest_type,
    req.body.farm_pest_location
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added pest', result.rows[0]);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in pest post `, error);
      res.sendStatus(500);
    })
});

module.exports = router;