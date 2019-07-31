import worker from "./workerReducer";
import harvestYear from "./harvestYearReducer";
import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import waterSetup from './waterSetup';
import cropSetup from './cropSetup';
import farmMenuConditional from './farmMenuConditionalReducer';
import labelCode from './labelCodesReducer';
import setupManure from './setupManureReducer';
import setupCompost from './setupCompostReducer'
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
  bathroomReducer
  
});

export default rootReducer;
