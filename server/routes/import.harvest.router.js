const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/', async (req, res) => {
    const client = await pool.connect();
    console.log('in import harvest');
    const harvest_year_id = 1;   // CHANGE ME -----------
    const newHarvestId = req.body.new_harvest_id;

    const getCropQuery = `SELECT * FROM "farm_crop" WHERE "harvest_year_id" = $1;`;
    const insertCropQuery = ` INSERT INTO "farm_crop"("farm_crop_type", "harvest_year_id", "farm_crop_status") VALUES($1, $2, $3);`;
    const cropKeys = ["farm_crop_type", "harvest_year_id", "farm_crop_status"];

    const getFieldQuery = `SELECT * FROM "farm_field" WHERE "harvest_year_id" = $1;`;
    const insertFieldQuery = ` INSERT INTO "farm_field" ("field_name", "harvest_year_id", "farm_field_status") VALUES($1, $2, $3);`;
    const fieldKeys = ["field_name", "harvest_year_id", "farm_field_status"];

    const getLabelCodeQuery = `SELECT * FROM "label_code" WHERE "harvest_year_id" = $1;`;
    const insertLabelCodeQuery = `INSERT INTO "label_code" ("farm_crop_id", "farm_field_id", "label_code_text", "harvest_year_id") VALUES ($1, $2, $3, $4);`;
    const labelCodeKeys = ["farm_crop_id", "farm_field_id", "label_code_text", "harvest_year_id"];


    // mutates previous year info by removing ids and updating to new harvest year
    // after item is mutated it is posted to the db
    // params are list to mutate, the property holding id for specfic table, insertQuery for specific table, and property keys for list item values
    const changeAndPost = (list, idKey, insertQuery, keys) => {
        console.log(`tochange `, list);

        for (item of list) {

            // remove ids 
            delete item[idKey];
            // change harvest years
            item.harvest_year_id = newHarvestId;
           let values = keys.map(key => item[key])
           console.log(`new values `, values);
           client.query(insertQuery, values)
        }
    }

          try {
            await client.query('BEGIN')
            
            const cropResult = await client.query(getCropQuery, [harvest_year_id]);
            await changeAndPost(cropResult.rows, 'farm_crop_id', insertCropQuery, cropKeys);

            const fieldResult = await client.query(getFieldQuery, [harvest_year_id]);
            await changeAndPost(fieldResult.rows, 'farm_field_id', insertFieldQuery, fieldKeys);
            
            const labelCodeResult = await client.query(getLabelCodeQuery, [harvest_year_id]);
            await changeAndPost(labelCodeResult.rows, 'farm_field_id', insertLabelCodeQuery, labelCodeKeys);

            await client.query('COMMIT')
            res.sendStatus(200);
        } catch (error) {
            await client.query('ROLLBACK')
            console.log('Error harvest year import', error);
            res.sendStatus(500);
        } finally {
            client.release()
      }
  });


module.exports = router;