import worker from "./workerReducer";
import harvestYear from "./harvestYearReducer";
import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import waterSetup from './waterSetup';
import cropSetup from './cropSetup';
import equipmentReducer from './equipmentReducer';
import farmMenuConditional from './farmMenuConditionalReducer';
import labelCode from './labelCodesReducer';
import setupManure from './setupManureReducer';
import setupCompost from './setupCompostReducer';
import setupFacilities from './setupFacilitiesReducer';
import person from './personReducer';
import recordharvestyear from './recordHarvestYearReducer';
import recordwaterinspect from './recordWaterInspectReducer';
import recordyear from './recordHarvestYearReducer';
import recordemployee from './recordEmployeeReducer';
import recordharvest from './recordHarvestReducer';
import recordwatertreat from './recordWaterTreatReducer';
import recordmanure from './recordManureReducer';
import recordcompostpile from './recordCompostPileReducer';
import editPerson from './EditPersonReducer';
import editUser from './EditUserReducer';
import userdata from './allUsersReducer';
import recordcrops from './recordCropReducer';
import recordcompostturn from './recordCompostTurnReducer';
import bathroomReducer from './logBathroomReducer';
import coolerReducer from './logCoolerReducer';
import toolReducer from './logToolReducer';
import facilityOtherReducer from './logFacilityOtherReducer';
import packingReducer from './logPackingReducer';
import vehicleReducer from './logVehicleReducer';
import thermometerReducer from './logThermometerReducer';
import firstAidReducer from './logFirstAidReducer';
import pestReducer from './logPestReducer';
import equipmentOtherReducer from './logEquipmentOtherReducer';
import recordBathroom from './recordBathroomReducer';
import recordCooler from './recordCoolerReducer';
import recordPacking from './recordPackingReducer';
import recordFacilityOther from './recordFacilityOtherReducer';
import recordFirstAid from './recordFirstAidReducer';
import recordTool from './recordToolReducer';
import recordEquipmentOther from './recordEquipmentOtherReducer';
import recordPest from './recordPestReducer';
import recordVehicle from './recordVehicleReducer';
import recordThermometer from './recordThermometerReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  editPerson,
  editUser,
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  worker,
  harvestYear,
  waterSetup,
  cropSetup,
  farmMenuConditional,
  labelCode,
  setupManure,
  setupCompost,
  setupFacilities,
  person,
  recordharvestyear,
  recordwaterinspect,
  recordyear,
  recordemployee,
  recordharvest,
  recordwatertreat,
  recordmanure,
  recordcompostpile,
  userdata, 
  recordcrops,
  recordcompostturn,
  bathroomReducer,
  equipmentReducer,
  coolerReducer,
  toolReducer,
  facilityOtherReducer,
  packingReducer,
  vehicleReducer,
  thermometerReducer,
  firstAidReducer,
  pestReducer,
  equipmentOtherReducer,
  recordBathroom,
  recordCooler,
  recordPacking,
  recordFacilityOther,
  recordFirstAid,
  recordTool,
  recordEquipmentOther,
  recordPest,
  recordVehicle,
  recordThermometer
});

export default rootReducer;
