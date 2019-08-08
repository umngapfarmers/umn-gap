const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  let sqlText = `SELECT * FROM "farm_packing" WHERE "harvest_year_id" = $1;`
  let harvest_id = req.user.current_harvest_year;
  pool.query(sqlText, [harvest_id])
    .then((result) => {
      res.send(result.rows)
    })
    .catch((error) => {
      console.log(`error getting packing info`, error);
      
      res.sendStatus(500);
    })
});


router.post('/new', rejectUnauthenticated, (req, res) => {
  console.log(`in post compost `, req.user);

  let sqlText = `INSERT INTO "farm_packing"
        ("farm_packing_name", "harvest_year_id")
        VALUES ($1, $2);`;
  let values = [
    req.body.name,
    req.user.current_harvest_year,
  ];

  pool.query(sqlText, values)
    .then((result) => {
      console.log(`sent cooler`);

      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`error in packing post `, error);
      res.sendStatus(500);
    })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let sqlText = `DELETE FROM "farm_packing" WHERE "farm_packing_id" = $1`;
  let cooler_id = req.params.id;
  pool.query(sqlText, [cooler_id])
    .then((result) => {
      console.log('deleted packing ');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`error in packing delete `, error);
      res.sendStatus(500);
    })
});

module.exports = router;