const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlText = `SELECT * FROM "farm_cooler" WHERE "harvest_year_id" = $1 AND "farm_cooler_status"=true;`
    let harvest_id = req.user.current_harvest_year;
    console.log(`harvest id off user GET`, harvest_id);
    // let harvest_id = 2
    pool.query(sqlText, [harvest_id])
        .then((result) => {
            console.log(`result from coooler GET`, result.rows);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(`error getting cooler`, error);
            res.sendStatus(500);
        })
});


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(`in post compost `, req.user);

    let sqlText = `INSERT INTO "farm_cooler"
        ("farm_cooler_name", "harvest_year_id")
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
            console.log(`error in farm_cooler post `, error);
            res.sendStatus(500);
        })
});

router.post('/edit', rejectUnauthenticated, (req, res) => {
    console.log(`in post compost `, req.user);

    let sqlText = `INSERT INTO "farm_cooler"
        ("farm_cooler_name", "harvest_year_id")
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
            console.log(`error in farm_cooler post `, error);
            res.sendStatus(500);
        })
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let sqlText = `DELETE FROM "farm_cooler" WHERE "farm_cooler_id" = $1`;
    let cooler_id = req.params.id;
    pool.query(sqlText, [cooler_id])
        .then((result) => {
            console.log('deleted cooler source ');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in farm_cooler delete `, error);
            res.sendStatus(500);
        })

})

router.put("/edit", rejectUnauthenticated, (req, res) => {
  const id = req.body.farm_cooler_id;
  const type = req.body.farm_cooler_name;

  const queryText =
    'UPDATE "farm_cooler" SET "farm_cooler_name"=$1 WHERE farm_cooler_id=$2';
  pool
    .query(queryText, [type, id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.put("/disable", rejectUnauthenticated, (req, res) => {
  const id = req.body.checked;
  console.log("checked is", req.body);
  for (let num of id) {
    const queryText =
      'UPDATE "farm_cooler" SET "farm_cooler_status"= FALSE WHERE farm_cooler_id=$1';
    pool
      .query(queryText, [num])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  }
});

module.exports = router;