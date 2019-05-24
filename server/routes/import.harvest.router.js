const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect();
    console.log('in import harvest');
    const harvest_year_id = 1;   // CHANGE ME -----------

    const newHarvest = req.body;
    const newHarvestQuery = `INSERT INTO "harvest_year" ("harvest_year", "farm_id") VALUES ($1, $2) RETURNING "harvest_id";`

    // select and insert queries, as well as property names for each table to be imported
    const getCropQuery = `SELECT * FROM "farm_crop" WHERE "harvest_year_id" = $1;`;
    const insertCropQuery = ` INSERT INTO "farm_crop"("farm_crop_type", "harvest_year_id", "farm_crop_status") VALUES($1, $2, $3);`;
    const cropKeys = ["farm_crop_type", "harvest_year_id", "farm_crop_status"];

    const getFieldQuery = `SELECT * FROM "farm_field" WHERE "harvest_year_id" = $1;`;
    const insertFieldQuery = ` INSERT INTO "farm_field" ("field_name", "harvest_year_id", "farm_field_status") VALUES($1, $2, $3);`;
    const fieldKeys = ["field_name", "harvest_year_id", "farm_field_status"];

    const getLabelCodeQuery = `SELECT * FROM "label_code" WHERE "harvest_year_id" = $1;`;
    const insertLabelCodeQuery = `INSERT INTO "label_code" ("farm_crop_id", "farm_field_id", "label_code_text", "harvest_year_id") VALUES ($1, $2, $3, $4);`;
    const labelCodeKeys = ["farm_crop_id", "farm_field_id", "label_code_text", "harvest_year_id"];

    const getFarmManureQuery = `SELECT * FROM "farm_manure" WHERE "harvest_year_id" = $1;`;
    const insertFarmManureQuery = ` INSERT INTO "farm_manure" ("farm_manure_date", "farm_manure_description", "farm_manure_rate", "label_code_id", "harvest_year_id","farm_manure_status") 
                        VALUES($1, $2, $3, $4, $5, $6);`;
    const farmManureKeys = ["farm_manure_date", "farm_manure_description", "farm_manure_rate", "label_code_id", "harvest_year_id", "farm_manure_status"];

    const getFarmCompost = `SELECT * FROM "farm_compost" WHERE "harvest_year_id" = $1;`;
    const insertFarmCompostQuery = ` INSERT INTO "farm_compost"("farm_compost_name", "farm_compost_date", "farm_compost_description", "harvest_year_id","farm_compost_status")
                                    VALUES($1, $2, $3, $4, $5);`;
    const farmCompostKeys = ["farm_compost_name", "farm_compost_date", "farm_compost_description", "harvest_year_id", "farm_compost_status"];
    
    const getFarmWaterSource = `SELECT * FROM "farm_water_source" WHERE "harvest_year_id" = $1;`;
    const insertFarmWaterSourceQuery = `INSERT INTO "farm_water_source" ("farm_water_source_name", "harvest_year_id") VALUES ($1, $2);`;
    const farmWaterSourceKeys = ["farm_water_source_name", "harvest_year_id"];
    
    const getFarmWater = `SELECT * FROM "farm_water" WHERE "harvest_year_id" = $1;`;
    const insertFarmWaterQuery = `INSERT INTO "farm_water" ("farm_water_source_id", "label_code_id", "harvest_year_id")VALUES ($1, $2, $3);`;
    const farmWaterKeys = ["farm_water_source_id", "label_code_id", "harvest_year_id"];

    const userUpdateQuery = `UPDATE "user" SET "current_harvest_year" = $1 WHERE "user_id" = $2`;

    // updates harvest year of each item    
    // after item is mutated it is posted to the db
    // params are list to mutate, the property holding id for specfic table, insertQuery for specific table, and property keys for list item values
    const changeAndPost = (list, idKey, insertQuery, keys, newHarvestId) => {
        console.log(`tochange `, list);
        for (item of list) {

            // change harvest years
            item.harvest_year_id = newHarvestId;
            let values = keys.map(key => item[key])
            console.log(`new values `, values);
            client.query(insertQuery, values)
        }
    }


    try {
        await client.query('BEGIN')
        
        const result = await client.query(newHarvestQuery, [newHarvest.harvest_year, newHarvest.farm_id]);
        const newHarvestId = result.rows[0].harvest_id
        console.log(`newHarvestId `, newHarvestId);

        const cropResult = await client.query(getCropQuery, [harvest_year_id]);
        await changeAndPost(cropResult.rows, 'farm_crop_id', insertCropQuery, cropKeys, newHarvestId);

        const fieldResult = await client.query(getFieldQuery, [harvest_year_id]);
        await changeAndPost(fieldResult.rows, 'farm_field_id', insertFieldQuery, fieldKeys, newHarvestId);
        
        const labelCodeResult = await client.query(getLabelCodeQuery, [harvest_year_id]);
        await changeAndPost(labelCodeResult.rows, 'label_code_id', insertLabelCodeQuery, labelCodeKeys, newHarvestId);

        const farmManureResult = await client.query(getFarmManureQuery, [harvest_year_id]);
        await changeAndPost(farmManureResult.rows, 'farm_manure_id', insertFarmManureQuery, farmManureKeys, newHarvestId);

        const farmCompostResult = await client.query(getFarmCompost, [harvest_year_id]);
        await changeAndPost(farmCompostResult.rows, 'farm_compost_id', insertFarmCompostQuery, farmCompostKeys, newHarvestId);

        const farmWaterSourceResult = await client.query(getFarmWaterSource, [harvest_year_id]);
        await changeAndPost(farmWaterSourceResult.rows, 'farm_water_source_id', insertFarmWaterSourceQuery, farmWaterSourceKeys, newHarvestId);

        const farmWaterResult = await client.query(getFarmWater, [harvest_year_id]);
        await changeAndPost(farmWaterResult.rows, 'farm_water_id', insertFarmWaterQuery, farmWaterKeys, newHarvestId);

        await client.query(userUpdateQuery, [newHarvestId, req.user.user_id]) // req.user.user_id
        await client.query('COMMIT')
        res.sendStatus(200);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error harvest year import', error);
        alert("That didn't work, please try again")
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });


module.exports = router;