const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    console.log('in post router');

    const newProject = req.body;
    const queryText = `INSERT INTO "farm_water" ("farm_water_source", "farm_water_status", "description", "length", "video_url", "image_url")
                    VALUES ($1, $2, $3, $4, $5, $6)`;
    const queryValues = [
        newProject.title,
        newProject.year,
        newProject.description,
        newProject.length,
        newProject.video_url,
        newProject.image_url,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing SELECT movies query', err);
            res.sendStatus(500);
        });

});


module.exports = router;