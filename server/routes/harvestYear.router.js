const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
    console.log('in get harvest year');
    
    pool
        .query(`SELECT * FROM "harvest_year" ORDER BY "harvest_year" DESC;`)
        .then(result => {
            hYear = result.rows;
            console.log(hYear);
            res.send(hYear);
        })
        .catch(error => {
            console.log("errors with Harvest Year", error);
            res.sendStatus(500);
        });
});

module.exports = router;