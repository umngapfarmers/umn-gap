const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const queries = require('../constants/pdfExportQueries');


// recieves selectedHarvest object containing the pkey, harvest year, and farm id
// returns a document definition for pdf make
router.post('/', rejectUnauthenticated, async (req, res) => {    
    // will loop through the query result and reformat for pdfmake display
    // calls typeCheck to parse bool and date formats
    // flattens object into array of values for pdfmaker
    // returns array of values
    processArray = (data) => {


        let result = [];
        let columnNames = Object.keys(data[0]);
        result.push(columnNames);
        for (row of data) {
            let rowValues = Object.values(row);

            for (let i = 0; i < rowValues.length; i++) {
                rowValues[i] = typeCheck(rowValues[i])
            }
            result.push(rowValues);
        }

        return result
    }

    // called on each table cell in processArray
    // takes in value and checks for date or bool type
    // if date or bool converts to readable format and returns
    // otherwise returns original value
    typeCheck = (value) => {

        if (!Number.isNaN(value) || moment(value, 'YYYY-MM-DD').isValid()) {
            if (moment(value, 'YYYY-MM-DD', true).isValid()) {
                return moment(value).format('YYYY-MM-DD')
            } else if ((typeof (value)) === 'boolean') {
                if(value===true){
                    return 'X'
                }
                else if(value===false){
                    return ' '
                }
            } else {
                return value
            }
        }
        else{
            return value
        }
    }

    // checks if data table is empty
    // takes in data table and the table title
    // if first position in .rows is truthy then call processArray and createTableDef
    // returns tableDef which is called in docDef and is ultimatley rendereded by pdfMake
    getTable = (getResponse, tableName) => {
        let processedData = [];
        let tableDef = [];
        if (getResponse.rows[0]) {
            processedData = processArray(getResponse.rows);
            tableDef = createTableDef(processedData, tableName)
        }
        return tableDef
    }


    // creates array which is readable by pdfmake
    // creates a widths object, currently all widths have to be the same
    // returns array with a style object, a table content object, and an empty line for spacing 
    createTableDef = (values, tableName) => {
        let widths= [];
        for (column in values[0]){
            widths.push('*')
        }
        
        let tableObj= {
            widths, 
            table:{
                body:values,
            }
        };
        console.log('tableDef ', tableName)
        return [
                    {
                        text: tableName, 
                        style: 'header'
                    }, 
                    tableObj, 
                    ' '
                ]
    }

    const client = await pool.connect();

    let selectedHarvest = req.body
    let harvestId = selectedHarvest.harvest_id;
    let harvestYear = selectedHarvest.harvest_year
    let farmId = req.user.farm_registry_id;

    try{
        console.log(`in record export`);
        

        await client.query('BEGIN')


        let waterTreatmentRes = await client.query(queries.waterTreatmentQuery, [harvestId]);
        let waterTreatmentDef = getTable(waterTreatmentRes, 'Water Treatment');

        let harvestRes = await client.query(queries.harvestQuery, [harvestId]);
        let harvestDef = getTable(harvestRes, 'Harvest');
        
        let compostLogRes = await client.query(queries.compostTreatmentQuery, [harvestId]);
        let compostLogDef =  getTable(compostLogRes, 'Compost Treatment');

        let farmCompostRes = await client.query(queries.farmCompostQuery, [harvestId]);
        let farmCompostDef =  getTable(farmCompostRes, 'Compost Piles');

        let labelCodeRes = await client.query(queries.labelCodeQuery, [harvestId]);
        let labelCodeDef = getTable(labelCodeRes, 'Label Codes')

        let farmManureRes = await client.query(queries.farmManureQuery, [harvestId]);
        let farmManureDef = getTable(farmManureRes, 'Manure');

        let farmWaterRes = await client.query(queries.farmWaterSourceQuery, [harvestId]);
        let farmWaterDef = getTable(farmWaterRes, 'Water Sources');

        let farmWaterAppRes = await client.query(queries.farmWaterQuery, [harvestId]);
        let farmWaterAppDef = getTable(farmWaterAppRes, 'Water Application');

        let trainingRes = await client.query(queries.trainingQuery, [harvestId]);
        let trainingDef = getTable(trainingRes, 'Employee Training');

        let waterInspectionRes = await client.query(queries.waterInspectionQuery, [harvestId]);
        let waterInspectionDef = getTable(waterInspectionRes, 'Water Inspection');

        // begin equipment
        let toolListResponse = await client.query(queries.toolListQuery, [harvestId]);
        let toolListDef = getTable(toolListResponse, 'Tool List');

        let toolLogRes = await client.query(queries.toolLogQuery, [harvestId]);
        let toolLogDef = getTable(toolLogRes, 'Tool Cleaning and Sanitizing');

        let farmInfo = await client.query(queries.farmQuery, [farmId])
        farmInfo=farmInfo.rows[0]
        
        // the document definition, read by pdfMake to render pdf
        docDef = {
            pageOrientation: 'landscape',
            content: [
                {
                    text: `Good Agricultural Practices ${harvestYear}`,
                    style: `header2`
                },
                ' ',
                {
                    text: `${farmInfo.farm_name}`,
                    style: 'header2'
                },
                {
                    text: `${farmInfo.address}`,
                    style: 'subheader'
                },
                {
                    text: `${farmInfo.city}, ${farmInfo.state} ${farmInfo.zip_code}`,
                    style: 'subheader'
                }
            ].concat(
                labelCodeDef, 
                harvestDef, 
                farmManureDef, 
                farmCompostDef, 
                compostLogDef, 
                farmWaterDef, 
                farmWaterAppDef,
                waterInspectionDef,
                waterTreatmentDef,
                toolListDef,
                toolLogDef,
                trainingDef
                ),
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                header2: {
                    fontSize: 24,
                    bold: true,
                    alignment: 'center'
                },
                subheader:{
                    alignment: 'center'
                }
            }
        }
        res.send(docDef);
    } catch (error) {
        await client.query('ROLLBACK')
        res.sendStatus(500);
    } finally {
        client.release()
    }
});



module.exports = router;