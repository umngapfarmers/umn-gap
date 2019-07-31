
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const addWorkerRouter = require ('./routes/addWorker.router')
const harvestYearRouter= require('./routes/harvestYear.router')
const setupWaterRouter = require('./routes/setup.water.router')
const setupCropRouter = require('./routes/setup.crop.router')
const setupManureRouter = require('./routes/setup.manure.router');
const setupCoolerRouter = require('./routes/setup.cooler.router')
const setupCompostRouter = require('./routes/setup.compost.router');
const setupRouter = require('./routes/setup.router');
const labelCodeRouter = require('./routes/setup.labelCode.router');
const logCompost = require('./routes/log.compost.router')
const log_harvestRouter = require('./routes/log.harvest.router');
const log_employeeRouter = require('./routes/log.employee.router');
const importHarvestRouter = require('./routes/import.harvest.router');
const manageUserRouter = require('./routes/manageuser.router');
const record_harvestYearRouter = require('./routes/record.harvestYear.router');
const record_waterInpectRouter = require('./routes/record.waterInspect.router');
const record_employeeRouter = require('./routes/record.employee.router');
const record_harvestRouter = require('./routes/record.harvest.router')
const record_waterTreatRouter = require('./routes/record.waterTreat.router');
const record_manureRouter = require('./routes/record.manure.router');
const record_compostPileRouter = require ('./routes/record.compostPile.router');
const log_waterRouter = require('./routes/log.water.router');
const superAdminRouter = require('./routes/superadmin.router')
const record_compostTurnRouter = require('./routes/record.compostTurn.router');
const exportRouter = require('./routes/record.export.router');
const passwordRecoveryRouter = require ('./routes/passwordRecovery.router');
const log_bathroomRouter= require('./routes/log.bathroom.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/addworker',addWorkerRouter);
//app.use('/editworker', addWorkerRouter);

app.use('/hyear',harvestYearRouter); //gets the harvest_year_id
app.use('/setupWater', setupWaterRouter); //gets, adds, edits, removes, and disables any water sources or water labels
app.use('/setupCrop', setupCropRouter); //gets, adds, edits, removes, and disables any crop or field sources
app.use('/setup', setupRouter); //creates a new harvest year in database
app.use('/setup/cooler', setupCoolerRouter);
app.use('/setup/label_code', labelCodeRouter);//gets, adds, edits, removes, and disables any labelcodes
app.use('/setup/manure', setupManureRouter); //gets, adds, edits, removes, and disables any manure sources
app.use('/setup/compost', setupCompostRouter) //gets, adds, edits, removes, and disables any compost sources
app.use('/log/harvest/', log_harvestRouter); //gets person data and adds harvest logs
app.use('/log/employee', log_employeeRouter); //gets, adds, edits, removes, and disables employee data
app.use('/import', importHarvestRouter); //gets data from past year and copies it into a new harvest year
app.use('/manage', manageUserRouter);//gets, adds, edits, removes, and disables employee data
app.use('/record/harvestYear', record_harvestYearRouter); //gets harvest year according to farm_id
app.use ('/record/waterinspect', record_waterInpectRouter); //gets records for water inspection logs
app.use('/record/employee', record_employeeRouter); //gets records for employee training logs
app.use('/record/harvest', record_harvestRouter); //gets records for past harvests
app.use('/record/waterTreat', record_waterTreatRouter); //gets records for water treatment logs
app.use('/log/compost', logCompost); //adds logs for compost management
app.use('/record/manure', record_manureRouter); //gets records for manure application
app.use('/record/compostPile', record_compostPileRouter); //gets records for compost piles
app.use('/log/water', log_waterRouter); //adds logs for water treatment and inspection
app.use('/superadmin', superAdminRouter); //gets and changes id to superadmin if user has permissions
app.use('/record/compostturn', record_compostTurnRouter); //gets records for compost management logs
app.use('/record/export', exportRouter)
app.use('/passwordRecovery', passwordRecoveryRouter);
app.use('/log/bathroom', log_bathroomRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
