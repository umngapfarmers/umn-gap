const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');



router.post('/new/farm_tool', (req, res) => {
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

router.post('/new/thermometer', (req, res) => {
  let harvest_id = req.user.current_harvest_year;
  let sqlText = `INSERT INTO "farm_thermometer" ("farm_thermometer_name", "harvest_year_id") VALUES ($1, $2);`
  let values = [
    req.body.farm_thermometer_name,
    harvest_id
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added thermometer');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in thermometer post `, error);
      res.sendStatus(500);
    })
});

router.post('/new/firstaid', (req, res) => {
  let harvest_id = req.user.current_harvest_year;
  let sqlText = `INSERT INTO "farm_firstaid" ("farm_firstaid_location", "harvest_year_id") VALUES ($1, $2);`
  let values = [
    req.body.farm_firstaid_location,
    harvest_id
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added firstaid');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in firstaid post `, error);
      res.sendStatus(500);
    })
});

router.post('/new/pest', (req, res) => {
  let harvest_id = req.user.current_harvest_year;
  let sqlText = `INSERT INTO "farm_pest" ("farm_pest_type", "farm_pest_location", "harvest_year_id" VALUES ($1, $2, $3);`
  let values = [
    req.body.farm_pest_type,
    req.body.farm_pest_location,
    harvest_id
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log('added pest');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in pest post `, error);
      res.sendStatus(500);
    })
});

router.post('/new/equipment_other', (req, res) => {
  let harvest_id = req.user.current_harvest_year;
  let sqlText = `INSERT INTO "farm_equipment_other" ("farm_equipment_other_name", "harvest_year_id") VALUES ($1, $2);`
  let values = [
    req.body.farm_equipment_other_name,
    harvest_id
  ];

  pool.query(sqlText, values)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in other equipment post `, error);
      res.sendStatus(500);
    })
});

module.exports = router;