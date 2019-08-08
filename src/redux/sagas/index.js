import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
//import setupFarmSaga from './setupFarmSaga'
import workerSaga from './workerSaga';
import harvestYearSaga from './harvestYearSaga';

import waterSetup from './waterSetup';
import cropSetup from './cropSetup';
import setupBathroomSaga from './setupBathroomSaga';
import setupCoolerSaga from './setupCoolerSaga';
import setupSaga from './setupSaga';
import getLabelCodeSaga from './getLabelCodeSaga';
import setupManureSaga from './setupManureSaga';
import setupCompostSaga from './setupCompostSaga';
import setupOtherEquipmentSaga from './equipmentSagas/setupOtherEquipmentSaga';
import setupToolSaga from './equipmentSagas/setupToolEquipmentSaga';
import setupVehicleSaga from './equipmentSagas/setupVehicleEquipmentSaga';
import setupThermometerSaga from './equipmentSagas/setupThermometerEquipmentSaga';
import setupPestSaga from './equipmentSagas/setupPestEquipmentSaga';
import setupFirstaidSaga from './equipmentSagas/setupFirstaidEquipmentSaga';

import personSaga from './personSaga';
import harvestSaga from './harvestLogSaga';
import employeeLogSaga from './employeeLogSaga';
import manageUserSaga from './manageUserSaga';
import recordHarvestYearSaga from './recordSagas/recordHarvestYearSaga';
import recordWaterInspectSaga from './recordSagas/recordWaterInspectSaga';
import recordEmployeeSaga from './recordSagas/recordEmployeeSaga';
import recordHarvestSaga from './recordSagas/recordHarvestSaga';
import importHarvestSaga from './importHarvestSaga';
import addCompostLogSaga from './logCompostSaga'
import recordWaterTreatSaga from './recordSagas/recordWaterTreatSaga'
import recordManureSaga from './recordSagas/recordManureSaga';
import recordCompostPileSaga from './recordSagas/recordCompostPileSaga';
import logWaterSaga from './logWaterSaga';
import allUsersSaga from './allUsersSaga';
import recordCropSaga from './recordSagas/recordCropSaga';
import recordCompostTurnSaga from './recordSagas/recordCompostTurnSaga';
import exportPdfSaga from './exportPdfSaga';
import passwordRecoverySaga from './passwordRecoverySaga';
import logBathroomSaga from './logBathroomSaga';
import logCoolerSaga from './logCoolerSaga';
import logToolSaga from './logToolSaga';
import logFacilityOtherSaga from './logFacilityOtherSaga';
import logPackingSaga from './logPackingSaga';
import logVehicleSaga from './logVehicleSaga';
import logThermometerSaga from './logThermometerSaga';
import logFirstAidSaga from './logFirstAidSaga';
import logPestSaga from './logPestSaga';
import logEquipmentOtherSaga from './logEquipmentOtherSaga';
import recordBathroomSaga from './recordSagas/recordBathroomSaga';
import recordCoolerSaga from './recordSagas/recordCoolerSaga';
import recordPackingSaga from './recordSagas/recordPackingSaga';


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
    setupCoolerSaga(),
    setupBathroomSaga(),
    setupSaga(),
    setupManureSaga(),
    setupCompostSaga(),
    setupOtherEquipmentSaga(),
    personSaga(),
    harvestSaga(),
    employeeLogSaga(),
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
    allUsersSaga(),
    recordCropSaga(),
    recordCompostTurnSaga(),
    exportPdfSaga(),
    passwordRecoverySaga(),
    logBathroomSaga(),
    setupToolSaga(),
    setupVehicleSaga(),
    logCoolerSaga(),
    logToolSaga(),
    logFacilityOtherSaga(),
    logPackingSaga(),
    logVehicleSaga(),
    logThermometerSaga(),
    logFirstAidSaga(),
    logPestSaga(),
    logEquipmentOtherSaga(),
    setupThermometerSaga(),
    setupPestSaga(),
    setupFirstaidSaga(),
    recordBathroomSaga(),
    recordCoolerSaga(),
    recordPackingSaga()
  ]);
}
