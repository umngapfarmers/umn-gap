
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
const setupRouter = require('./routes/setup.router');
const labelCodeRouter = require('./routes/setup.labelCode.router');
const setupManureRouter = require('./routes/setup.manure.router');
const setupCompostRouter = require('./routes/setup.compost.router');
const log_harvestRouter = require('./routes/log.harvest.router');
const log_employeeRouter = require('./routes/log.employee.router');
const manageUserRouter = require('./routes/manageuser.router');
const record_harvestYearRouter = require('./routes/record.harvestYear.router');
const record_employeeRouter = require('./routes/record.employee.router');
const record_harvestRouter = require('./routes/record.harvest.router')


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

app.use('/hyear',harvestYearRouter);
app.use('/setupWater', setupWaterRouter);
app.use('/setupCrop', setupCropRouter);
app.use('/setup/label_code', labelCodeRouter)
app.use('/setup', setupRouter);
app.use('/setup/label_code', labelCodeRouter);
app.use('/setup/manure', setupManureRouter);
app.use('/setup/compost', setupCompostRouter)
app.use('/log/harvest/', log_harvestRouter)
app.use('/log/employee', log_employeeRouter);
app.use('/manage', manageUserRouter);
app.use('/record/harvestYear', record_harvestYearRouter);
app.use('/record/employee', record_employeeRouter);
app.use('/record/harvest', record_harvestRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
