const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  let sqlText = `SELECT * FROM "farm_facility_other" WHERE "harvest_year_id" = $1;`
  let harvest_id = req.user.current_harvest_year;
  pool.query(sqlText, [harvest_id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log(`error getting other info`, error);

      res.sendStatus(500);
    })
});


router.post('/new', rejectUnauthenticated, (req, res) => {

  let sqlText = `INSERT INTO "farm_facility_other"
        ("farm_facility_other_name", "harvest_year_id")
        VALUES ($1, $2);`;
  let values = [
    req.body.farm_facility_other_name,
    req.user.current_harvest_year,
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log(`sent other facility`);

      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in other post `, error);
      res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let sqlText = `DELETE FROM "farm_facility_other" WHERE "farm_facility_other_id" = $1`;
  let cooler_id = req.params.id;
  pool.query(sqlText, [cooler_id])
    .then((result) => {
      console.log('deleted other ');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`error in other delete `, error);
      res.sendStatus(500);
    })
});

module.exports = router;