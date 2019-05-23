const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */

router.get("/person", (req, res) => {
  console.log("IN GETTY PERSON");
  const current_harvest_id = req.user.current_harvest_year;
  let sqlQuery = `SELECT * FROM "person" WHERE "current_harvest_id" = $1;`;
  pool
    .query(sqlQuery, [current_harvest_id])
    .then(response => {
      console.log(`response person`, response.rows);
      res.send(response.rows);
    })
    .catch(error => {
      console.log(`ERROR in GET PERSON`, error);
      res.sendStatus(500);
    });
});

router.get("/user", (req, res) => {
  console.log("IN GET USER");
  const current_harvest_id = req.user.current_harvest_year;
  //let sqlQuery = `SELECT * FROM "user" WHERE "current_harvest_year" = $1;`
  let sqlQuery = `SELECT "user".username,person.person_first,person.person_last FROM "user" JOIN 
PERSON ON person.user_id = "user".user_id
WHERE "current_harvest_year"= $1;`;
  pool
    .query(sqlQuery, [current_harvest_id])
    .then(response => {
      console.log(`response person`, response.rows);
      res.send(response.rows);
    })
    .catch(error => {
      console.log(`ERROR in GET PERSON`, error);
      res.sendStatus(500);
    });
});

router.get("/person/edit/", (req, res) => {
  console.log("IN EDIT PERSON ", req.query.person_id);
  pool
    .query(`select * from "person"  WHERE "person_id" = $1;`, [req.query.person_id])
    .then(response => {
      console.log(`response person`, response.rows);
      res.send(response.rows);
    })
    .catch(error => {
      console.log("errors with product delete query", error);
      res.sendStatus(500);
    });
});

module.exports = router;
