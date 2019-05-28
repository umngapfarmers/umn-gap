import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
//import setupFarmSaga from './setupFarmSaga'
import workerSaga from './workerSaga';
import harvestYearSaga from './harvestYearSaga';

import waterSetup from './waterSetup';
import cropSetup from './cropSetup';

import setupSaga from './setupSaga';
import getLabelCodeSaga from './getLabelCodeSaga';
import setupManureSaga from './setupManureSaga';
import setupCompostSaga from './setupCompostSaga';
import personSaga from './personSaga';
import harvestSaga from './harvestLogSaga';
import employeeLogSaga from './employeeLogSaga';
import manageUserSaga from './manageUserSaga';
import recordHarvestYearSaga from './recordHarvestYearSaga';
import recordWaterInspectSaga from './recordWaterInspectSaga';
import recordEmployeeSaga from './recordEmployeeSaga';
import recordHarvestSaga from './recordHarvestSaga';
import importHarvestSaga from './importHarvestSaga';
import addCompostLogSaga from './logCompostSaga'
import recordWaterTreatSaga from './recordWaterTreatSaga'
import recordManureSaga from './recordManureSaga';
import recordCompostPileSaga from './recordCompostPileSaga';
import logWaterSaga from './logWaterSaga';
import allUsersSaga from './allUsersSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    manageUserSaga(),

    loginSaga(),
    registrationSaga(),
    userSaga(),
    workerSaga(),
    harvestYearSaga(),
    waterSetup(),
    cropSetup(),
    getLabelCodeSaga(),
    setupSaga(),
    setupManureSaga(),
    setupCompostSaga(),
    personSaga(),
    harvestSaga(),
    employeeLogSaga(),
    manageUserSaga(),
    recordHarvestYearSaga(),
    recordWaterInspectSaga(),
    recordEmployeeSaga(),
    recordHarvestSaga(),
    importHarvestSaga(),
    recordWaterTreatSaga(),
    addCompostLogSaga(),
    recordManureSaga(),
    recordCompostPileSaga(),

    logWaterSaga(),
    allUsersSaga()
  ]);
}
