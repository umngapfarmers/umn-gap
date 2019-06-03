const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * GET route template
 */



router.get('/:id', rejectUnauthenticated, async (req, res) => {
    console.log(`in export `, req.params.id);
    let current_harvest = req.params.id
    const client = await pool.connect();
    const harvestQuery = 
        `SELECT "crop_harvest"."crop_harvest_date" as "harvest date", 
            "crop_harvest"."crop_harvest_amount" as "harvest amount", 
            "person"."person_first" as "sig first", 
            "person"."person_last" as "sig last", 
            "label_code"."label_code_text" as "label code"
            FROM "crop_harvest" 
            JOIN "label_code" ON "crop_harvest"."label_code_id" = "label_code"."label_code_id" 
            JOIN "person" on "crop_harvest"."crop_harvest_sig" = "person"."person_id" WHERE "crop_harvest"."harvest_year_id" = $1 
            ORDER BY "crop_harvest"."crop_harvest_date" ASC;`
                
    const compostTreatmentQuery = 
        `SELECT "farm_compost"."farm_compost_name" as "pile name", 
            "compost"."compost_turned" as "turned", 
            "compost"."compost_date" as "log date", 
            "compost"."test_area_1_temp" as "area 1 temp", 
            "compost"."test_area_2_temp"as "area 2 temp", 
            "compost"."test_area_3_temp" as "area 3 temp", 
            "compost"."test_area_4_temp" as "area 4 temp", 
            "person"."person_first"as "sig first", 
            "person"."person_last" as "sig last" 
 
            FROM "compost" 
            JOIN "farm_compost" on "farm_compost"."farm_compost_id" = "compost"."farm_compost_id"
 
            JOIN "person" on "compost"."compost_sig" = "person"."person_id" 
            WHERE "compost"."harvest_year_id" = $1 
            ORDER BY "compost"."compost_date" ASC;`


        // `SELECT "farm_compost"."farm_compost_name" as "pile name", 
        //     "compost"."compost_turned" as "turned", 
        //     "compost"."compost_date" as "log date", 
        //     "compost"."test_area_1_temp" as "area 1 temp", 
        //     "compost"."test_area_2_temp"as "area 2 temp", 
        //     "compost"."test_area_3_temp" as "area 3 temp", 
        //     "compost"."test_area_4_temp" as "area 4 temp", 
        //     "person"."person_first"as "sig first", 
        //     "person"."person_last" as "sig last", 
        //     "label_code"."label_code_text" 
        //     FROM "compost" 
        //     JOIN "farm_compost" on "farm_compost"."farm_compost_id" = "compost"."farm_compost_id"
        //     JOIN "label_code" ON "compost"."label_code_id" = "label_code"."label_code_id" 
        //     JOIN "person" on "compost"."compost_sig" = "person"."person_id" 
        //     WHERE "compost"."harvest_year_id" = $1 
        //     ORDER BY "compost"."compost_date" ASC;`
    
    const farmCompostQuery = 
        `SELECT "farm_compost"."farm_compost_name" as "compost name", 
            "farm_compost"."farm_compost_date" as "start date", 
            "farm_compost"."farm_compost_description" as "ingredients", 
            "farm_compost"."farm_compost_status" as "is active"
            FROM "farm_compost"
            WHERE "farm_compost"."harvest_year_id" = $1 
            ORDER BY "farm_compost"."farm_compost_date" ASC;`

    const labelCodeQuery = 
        `SELECT "label_code"."label_code_text" as "label code",
            "farm_crop"."farm_crop_type" as "crop",
            "farm_field"."field_name" as "field"
            FROM "label_code" 
            JOIN "farm_crop" ON "label_code"."farm_crop_id" = "farm_crop"."farm_crop_id" 
            JOIN "farm_field" ON "label_code"."farm_field_id" = "farm_field"."farm_field_id"
            WHERE "label_code"."harvest_year_id" = $1
            ORDER BY "farm_crop"."farm_crop_id" ASC;`

    const farmManureQuery = 
        `SELECT "farm_manure"."farm_manure_date" as "date applied", 
            "farm_manure"."farm_manure_description" as "description", 
            "farm_manure"."farm_manure_rate" as "rate applied",
            "label_code"."label_code_text" as "label code",
            "farm_manure"."farm_manure_status" as "is active"
            FROM "farm_manure" JOIN "label_code" ON "label_code"."label_code_id" = "farm_manure"."label_code_id"
            WHERE "farm_manure"."harvest_year_id" = $1
            ORDER BY "farm_manure"."farm_manure_date" ASC;`

    const farmWaterSourceQuery = 
        `SELECT "farm_water_source"."farm_water_source_name" as "source name", 
            "farm_water_source"."farm_water_status" as "is active"
            FROM "farm_water_source"
            WHERE "farm_water_source"."harvest_year_id" = $1;`

    const farmWaterQuery = 
    `SELECT "farm_water_source"."farm_water_source_name" as "source name",
        "label_code"."label_code_text" as "label code",
        "farm_water"."farm_water_status" as "is active" FROM "farm_water"
        JOIN "farm_water_source" ON "farm_water_source"."farm_water_source_id" = "farm_water"."farm_water_source_id"
        JOIN "label_code" on "label_code"."label_code_id" = "farm_water"."label_code_id"
        WHERE "farm_water"."harvest_year_id" = $1;`

    createTableDef = (values, tableName) => {
        // takes value and table name params, puts values into table object
        // returns array in form [ 'tableName', table]
        let widths= [];
        for (column in values[0]){
            widths.push('100')
        }
        console.log(`widths `, widths);
        
        let tableObj= {
            widths, 
            table:{
                body:values,
            }
        };
        return [{text: tableName, style: 'header'}, tableObj, ' ']
    }

    typeCheck = (value) => {
        // takes in value and checks for date or bool type
        // if date or bool converts to readable format and returns
        // otherwise returns original value
        if (!Number.isNaN(value) || moment(value, 'YYYY-MM-DD').isValid()) {
            if (moment(value, 'YYYY-MM-DD', true).isValid()) {
                console.log('is date', value);
                return moment(value).format('YYYY-MM-DD')
            } else if ((typeof (value)) === 'boolean') {
                console.log(`is bool`, value);
                if(value===true){
                    return 'X'
                }
                else if(value===false){
                    return ' '
                }
            } else {
                console.log(`is date or bool `, value);
                return value
            }
        }
        else{
            console.log('is a number', value)
            return value
        }
    }

    processArray = (data) => {
        // will loop through the query result and reformat for display
        // type check for bool and date formats and convert to strings
        // flattens object into array of values for pdfmaker
        console.log(`in processArray `, data)

        let result = [];
        let columnNames = Object.keys(data[0]);
        result.push(columnNames);
        for (row of data){
            console.log(`row `, row);
            let rowValues = Object.values(row);

            for (let i=0; i<rowValues.length;i++){
                rowValues[i] = typeCheck(rowValues[i])
                // console.log('after typeCheck values ', rowValues[i])
            }
            result.push(rowValues);
        }
        //console.log(`processArray result `, result)
        
        return result
    }

    getTable = (getResponse, tableName) => {
        let processedData = [];
        let tableDef = [];
        if (getResponse.rows[0]) {
            processedData = processArray(getResponse.rows);
            tableDef = createTableDef(processedData, tableName)
        }
        return tableDef
    }


    try{


        await client.query('BEGIN')


        let harvestRes = await client.query(harvestQuery, [current_harvest]);
        let harvestDef = getTable(harvestRes, 'Harvest');
        
        let compostLogRes = await client.query(compostTreatmentQuery, [current_harvest]);
        let compostLogDef =  getTable(compostLogRes, 'Compost Treatment');

        let farmCompostRes = await client.query(farmCompostQuery, [current_harvest]);
        let farmCompostDef =  getTable(farmCompostRes, 'Compost Piles');

        let labelCodeRes = await client.query(labelCodeQuery, [current_harvest]);
        let labelCodeDef = getTable(labelCodeRes, 'Label Codes')

        let farmManureRes = await client.query(farmManureQuery, [current_harvest]);
        let farmManureDef = getTable(farmManureRes, 'Farm Manure');

        let farmWaterRes = await client.query(farmWaterSourceQuery, [current_harvest]);
        let farmWaterDef = getTable(farmWaterRes, 'Water Sources');

        let farmWaterAppRes = await client.query(farmWaterQuery, [current_harvest]);
        let farmWaterAppDef = getTable(farmWaterAppRes, 'Water Application');

        



        // console.log(`harvest response `, harvestRes);
        
        docDef = {
            pageOrientation: 'landscape',
            content: [].concat(labelCodeDef, harvestDef, farmManureDef, farmCompostDef, compostLogDef, farmWaterDef, farmWaterAppDef),
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                }
            }
        }
        console.log(`docDef `, docDef.content);
        
        res.send(docDef);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error harvest year export', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});



module.exports = router;