import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';


// PROTECTED ROUTES AND AUTH
import AdminProtectedRoute from '../Auth/ProtectedRoute/AdminProtectedRoute';
import ChangePassword from '../Auth/PasswordRecovery/ChangePassword';
import CheckEmail from '../Auth/PasswordRecovery/CheckEmail';
import ForgotPassword from '../Auth/PasswordRecovery/ForgotPassword';
import ProtectedRoute from '../Auth/ProtectedRoute/ProtectedRoute';


//DASHBOARDS
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import EditHierarchy from '../AdminComponents/HarvestYear/EditHarvestYear/EditFarmInformationHierarchyMenu/EditFarmInformationHierarchyMenu';
import EnterFarmInformationHierarchyMenu from '../AdminComponents/HarvestYear/NewHarvestYear/EnterFarmInformationHierarchyMenu/EnterFarmInformationHierarchyMenu';
import EquipmentLogDashboard from '../AllUsersComponents/LogForms/SelectEquipmentLog/SelectEquipmentLog';
import FacilitiesLogDashboard from '../AllUsersComponents/LogForms/SelectFacilitiesLog/SelectFacilitiesLog';
import HarvestDashboard from '../AdminComponents/HarvestYear/HarvestYearDashboard/HarvestYearDashboard';
import LogDashboard from '../AllUsersComponents/LogForms/LogsHierarchyMenu/LogsHierarchyMenu';
import ManureCompostDash from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/ManureCompostDash/ManureCompostDash';
import NewHarvestYearDashboard from '../AdminComponents/HarvestYear/NewHarvestYear/NewHarvestDashboard/NewHarvestDashboard';
import RecordDashboard from '../AllUsersComponents/Records/RecordsHierarchyMenu/RecordsHierarchyMenu';
import RecordEquipmentDashboard from '../AllUsersComponents/Records/SelectEquipmentRecord/SelectEquipmentRecord';
import RecordFacilitiesDashboard from '../AllUsersComponents/Records/SelectFacilitiesRecord/SelectFacilitiesRecord';
import RecordHarvestDashboard from '../AllUsersComponents/Records/SelectHarvestRecord/SelectHarvestRecord';
import RecordManureDashboard from '../AllUsersComponents/Records/SelectManureCompostRecord/SelectManureCompostRecord';
import RecordWaterDashboard from '../AllUsersComponents/Records/SelectWaterRecord/SelectWaterRecord';
import WorkerDashboard from '../WorkerDashboard/WorkerDashboard';
import WaterLogDashboard from '../AllUsersComponents/LogForms/SelectWaterLog/SelectWaterLog';

//LOGS
import CompostLog from '../AllUsersComponents/LogForms/CompostPileLog/CompostPileLog';
import EmployeeLog from '../AllUsersComponents/LogForms/EmployeeTrainingLog/EmployeeTrainingLog';
import EquipmentToolLog from '../AllUsersComponents/LogForms/EquipmentToolLog/EquipmentToolLog';
import EquipmentVehicleLog from '../AllUsersComponents/LogForms/EquipmentVehicleLog/EquipmentVehicleLog';
import EquipmentThermometerLog from '../AllUsersComponents/LogForms/EquipmentThermometerLog/EquipmentThermometerLog';
import EquipmentFirstAidLog from '../AllUsersComponents/LogForms/EquipmentFirstAidLog/EquipmentFirstAidLog';
import EquipmentPestLog from '../AllUsersComponents/LogForms/EquipmentPestLog/EquipmentPestLog';
import EquipmentOtherLog from '../AllUsersComponents/LogForms/EquipmentOtherLog/EquipmentOtherLog';
import FacilitiesCoolerLog from '../AllUsersComponents/LogForms/FacilitiesCooler/FacilitiesCooler';
import FacilitiesBathroomLog from '../AllUsersComponents/LogForms/FacilitiesBathroom/FaciltiesBathroom';
import FacilitiesPackingLog from '../AllUsersComponents/LogForms/FacilitiesPacking/FacilitiesPacking';
import FacilitiesOtherLog from '../AllUsersComponents/LogForms/FacilitiesOther/FacilitiesOther';
import HarvestLog from '../AllUsersComponents/LogForms/HarvestLog/HarvestLog';
import WaterInspectLog from '../AllUsersComponents/LogForms/WaterInspectionLog/WaterInspectionLog';
import WaterTreatLog from '../AllUsersComponents/LogForms/WaterTreatmentLog/WaterTreatmentLog';

//RECORDS
import ExportDash from '../AllUsersComponents/Records/ExportPdf/ExportDash.js';
import RecordCompostPile from '../AllUsersComponents/Records/CompostPileRecord/CompostPileRecord';
import RecordCompostTurn from '../AllUsersComponents/Records/CompostTurningRecord/CompostTurningRecord';
import RecordEmployeeTraining from '../AllUsersComponents/Records/EmployeeTrainingRecord/EmployeeTrainingRecord';
import RecordEquipmentTool from '../AllUsersComponents/Records/EquipmentToolRecord/EquipmentToolRecord';
import RecordEquipmentVehicle from '../AllUsersComponents/Records/EquipmentVehicleRecord/EquipmentVehicleRecord';
import RecordEquipmentThermometer from '../AllUsersComponents/Records/EquipmentThermometerRecord/EquipmentThermometerRecord';
import RecordEquipmentFirstAid from '../AllUsersComponents/Records/EquipmentFirtAidRecord/EquipmentFirstAidRecord';
import RecordEquipmentPest from '../AllUsersComponents/Records/EquipmentPestRecord/EquipmentPestRecord';
import RecordEquipmentOther from '../AllUsersComponents/Records/EquipmentOtherRecord/EquipmentOtherRecord';
import RecordFacilitiesCooler from '../AllUsersComponents/Records/FacilitiesCoolerRecord/FacilitiesCoolerRecord';
import RecordFacilitiesBathroom from '../AllUsersComponents/Records/FacilitiesBathroomRecord/FacilitiesBathroomRecord';
import RecordFacilitiesPacking from '../AllUsersComponents/Records/FacilitiesPackingRecord/FacilitiesPackingRecord';
import RecordFacilitiesOther from '../AllUsersComponents/Records/FacilitiesOtherRecord/FacilitiesOtherRecord';
import RecordHarvest from '../AllUsersComponents/Records/HarvestRecord/HarvestRecord';
import RecordManure from '../AllUsersComponents/Records/ManureRecord/ManureRecord';
import RecordWaterInspect from '../AllUsersComponents/Records/WaterInspectionRecord/WaterInspectionRecord';
import RecordWaterTreat from '../AllUsersComponents/Records/WaterTreatmentRecord/WaterTreatmentRecord';
import RecordCropsFieldsLabelCode from '../AllUsersComponents/Records/CropsFieldsLabelCodeRecord/CropsFieldsLabelCodeRecord';



//CREATE 
import CreateCompost from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/CreateCompost/CreateCompost.js';
import CreateManure from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/CreateManure/CreateManure.js';
import CropTypes from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateCrops/CreateCrops';
import FieldTypes from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateFields/CreateFields';
import LabelCode from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateLabelCodes/CreateLabelCodes';
import NewHarvestYearDate from '../AdminComponents/HarvestYear/NewHarvestYear/SelectNewHarvestYearDate/SelectNewHarvestYearDate';
import WaterSource from '../AdminComponents/HarvestYear/NewHarvestYear/NewWater/CreateWaterSources/CreateWaterSources'
import WaterLabel from '../AdminComponents/HarvestYear/NewHarvestYear/NewWater/CreateWaterSourcesLabelCodes/CreateWaterSourcesLabelCodes';
import CreateEquipmentSelect from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/NewEquipmentSelect/NewEquipmentSelect.js'
import CreateEquipmentOther from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/CreateOther/CreateOther';
import CreateEquipmentTool from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/CreateTool/CreateTool';
import CreateEquipmentVehicle from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/CreateVehicle/CreateVehicle';
import CreateEquipmentThermometer from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/CreateThermometer/CreateThermometer';
import CreateEquipmentPest from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/CreatePest/CreatePest';
import CreateEquipmentFirstaid from '../AdminComponents/HarvestYear/NewHarvestYear/NewEquipment/CreateFirstaid/CreateFirstaid';

//EDIT
import EditCrops from '../AdminComponents/HarvestYear/EditHarvestYear/EditCrops/EditCrops';
import EditEmployee from '../AdminComponents/ManageRoles/EditEmployee';
import EditManure from '../AdminComponents/HarvestYear/EditHarvestYear/EditManureCompost/EditManureCompost';
import EditWater from '../AdminComponents/HarvestYear/EditHarvestYear/EditWater/EditWater';
import EditWorker from '../AdminComponents/ManageRoles/EditWorker';

//MANAGE USER
import AddWorker from '../AdminComponents/ManageRoles/AddWorker';
import EditUser from '../AdminComponents/ManageRoles/EditUser';
import ManageWorker from '../AdminComponents/ManageRoles/ManageWorker';
import ManageUserAccounts from '../SuperAdmin/ManageUserAccounts/ManageUserAccounts';




//STYLING
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faCarrot, faTint, faPen, faPlus, faSeedling, faHome, faTractor, faClipboard, faUsers, faTable, faHorse, faIdCard, faVial, faSignOutAlt, faThermometerThreeQuarters, faTrashAlt, faMinusCircle, faUserEdit, faUserPlus, faFileExport, faWarehouse, faTools, faToolbox, faTruckPickup, faThermometerHalf, faFirstAid, faSpider, faBoxOpen, faRestroom, faIgloo  } from '@fortawesome/free-solid-svg-icons';

import Typography from '@material-ui/core/Typography';
library.add(faHome,faCarrot, faRecycle, faPen, faPlus, faSeedling, faTint, faTractor, faClipboard, faUsers, faTable, faHorse, faIdCard, faVial, faSignOutAlt, faThermometerThreeQuarters, faTrashAlt, faMinusCircle, faUserEdit, faUserPlus, faFileExport, faWarehouse, faTools, faToolbox,faTruckPickup, faThermometerHalf, faFirstAid, faSpider, faBoxOpen, faRestroom, faIgloo);


class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              <Route
              exact
              path='/resetpassword'
              component={ChangePassword}
              />

              <ProtectedRoute
                exact
                path='/checkemail'
                component={CheckEmail}
              />
              {/* Visiting localhost:3000/about will show the about page.
              This is a route anyone can see, no login necessary */}
             <ProtectedRoute
              exact
              path="/home"
            />
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
          
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
              
              
              {/* CREATE */}
          
            <AdminProtectedRoute
                exact
                path="/newharvestyear"
                component={NewHarvestYearDate}
            />

            <AdminProtectedRoute
                exact
                path="/newfarminfo"
                component={EnterFarmInformationHierarchyMenu}
            />

            <AdminProtectedRoute
              exact
              path="/water"
              component={WaterSource}
            />

            <AdminProtectedRoute
              exact
              path="/waterlabel"
              component={WaterLabel}
            />

            <AdminProtectedRoute
              exact
              path="/crops"
              component={CropTypes}
            />

            <AdminProtectedRoute
              exact
              path="/field"
              component={FieldTypes}
            />

            <AdminProtectedRoute
              exact
              path="/labelcode"
              component={LabelCode}
            />
{/************* SETUP EQUIPMENT *************/ }
            <AdminProtectedRoute
              exact
              path="/newequipment"
              component={CreateEquipmentSelect}
            />
            < AdminProtectedRoute
              exact
              path = "/newOtherEquipment"
              component = {CreateEquipmentOther}
            />
            < AdminProtectedRoute
              exact
              path = "/newTool"
              component = {CreateEquipmentTool}
            />
            < AdminProtectedRoute
              exact
              path = "/newVehicle"
              component = {CreateEquipmentVehicle}
            />

            < AdminProtectedRoute
              exact
              path = "/newThermometer"
              component = {CreateEquipmentThermometer}
            />

            < AdminProtectedRoute
              exact
              path = "/newPest"
              component = {CreateEquipmentPest}
            />

            < AdminProtectedRoute
              exact
              path = "/newFirstaid"
              component = {CreateEquipmentFirstaid}
            />
{/************* SETUP EQUIPMENT END *************/ }


            <AdminProtectedRoute
              exact
              path="/createmanure"
              component={CreateManure}
            />

            <AdminProtectedRoute
              exact
              path="/createcompost"
              component={CreateCompost}
            />

            

             {/* DASHBOARDS */}
            <AdminProtectedRoute
              exact
              path="/admin"
              component={AdminDashboard}
            />
            
            <AdminProtectedRoute
              exact
              path="/harvestdashboard"
              component={HarvestDashboard}
            />

            <AdminProtectedRoute
                exact
                path="/newharvestyeardashboard"
                component={NewHarvestYearDashboard}
            />

            <ProtectedRoute
              exact
              path="/worker"
              component={WorkerDashboard}
            />

            <AdminProtectedRoute
              exact
              path="/fertilizerdash"
              component={ManureCompostDash}
            />

            <ProtectedRoute
              exact
              path='/logdashboard'
              component={LogDashboard}
            />

            <ProtectedRoute
              exact
              path='/waterlogdashboard'
              component={WaterLogDashboard}
            /> 

            <ProtectedRoute
              exact
              path="/recorddashboard"
              component={RecordDashboard}
            />

            <ProtectedRoute
              exact
              path='/recordwaterdashboard'
              component={RecordWaterDashboard}
            />

            <ProtectedRoute
              exact
              path='/recordmanuredashboard'
              component={RecordManureDashboard}
            />

            <ProtectedRoute
              exact
              path='/recordharvestdashboard'
              component={RecordHarvestDashboard}
            />

            <ProtectedRoute
              exact
              path='/facilitieslogdashboard'
              component={FacilitiesLogDashboard}
            />

            <ProtectedRoute
              exact
              path='/equipmentlogdashboard'
              component={EquipmentLogDashboard}
            /> 

            <ProtectedRoute
              exact
              path='/recordfacilitiesdashboard'
              component={RecordFacilitiesDashboard}
            />

            <ProtectedRoute
              exact
              path='/recordequipmentdashboard'
              component={RecordEquipmentDashboard}
            />



             {/* EDIT */}
            <AdminProtectedRoute
              exact
              path="/edithierarchy"
              component={EditHierarchy}
            />

            <AdminProtectedRoute
              exact
              path="/editcrops"
              component={EditCrops}
            />

            <AdminProtectedRoute
              exact
              path="/editmanure"
              component={EditManure}
            />

            <AdminProtectedRoute
              exact
              path="/editwater"
              component={EditWater}
            />
            <AdminProtectedRoute
              exact
              path="/harvestdashboard"
              component={HarvestDashboard}
            />
            <AdminProtectedRoute
              exact
              path="/newharvestyeardashboard"
              component={NewHarvestYearDashboard}
            />
            <ProtectedRoute
              exact
              path="/worker"
              component={WorkerDashboard}
            />
           
            {/* MANAGE USERS */}

            <AdminProtectedRoute
              exact
              path="/manageuser"
              component={ManageWorker}
            />

            <AdminProtectedRoute
              exact
              path="/addworker"
              component={AddWorker}
            />

            <AdminProtectedRoute
              exact
              path="/editworker"
              component={EditWorker}
          />

            <AdminProtectedRoute
              exact
              path="/editemployee"
              component={EditEmployee}
            />

            <AdminProtectedRoute
              exact
              path="/edituser"
              component={EditUser}
            />

            <AdminProtectedRoute
              exact
              path='/manageuseraccounts'
              component={ManageUserAccounts}
            />

            {/* LOGS */}

            <ProtectedRoute
              exact
              path='/harvestlog'
              component={HarvestLog}
            />

            <ProtectedRoute
              exact
              path = '/compostlog'
              component={CompostLog}
            /> 

            <AdminProtectedRoute
              exact
              path='/employeelog'
              component={EmployeeLog}
            />

            <ProtectedRoute
              exact
              path="/watertreatlog"
              component={WaterTreatLog}
            />

            <ProtectedRoute
              exact
              path="/waterinspectlog"
              component={WaterInspectLog}
            />

            <ProtectedRoute
              exact
              path='/facilitiesbathlog'
              component={FacilitiesBathroomLog}
            />

            <ProtectedRoute
              exact
              path='/facilitiespacklog'
              component={FacilitiesPackingLog}
            />

            <ProtectedRoute
              exact
              path='/facilitiescoolerlog'
              component={FacilitiesCoolerLog}
            />

            <ProtectedRoute
              exact
              path='/facilitiesotherlog'
              component={FacilitiesOtherLog}
            />

            <ProtectedRoute
              exact
              path='/equipmenttoollog'
              component={EquipmentToolLog}
            />

            <ProtectedRoute
              exact
              path='/equipmentvehiclelog'
              component={EquipmentVehicleLog}
            />

            <ProtectedRoute
              exact
              path='/equipmentthermomlog'
              component={EquipmentThermometerLog}
            />

            <ProtectedRoute
              exact
              path='/equipmentfirstaidlog'
              component={EquipmentFirstAidLog}
            />

            <ProtectedRoute
              exact
              path='/equipmentpestlog'
              component={EquipmentPestLog}
            />

            <ProtectedRoute
              exact
              path='/equipmentotherlog'
              component={EquipmentOtherLog}
            />

             {/* RECORDS */}


            <ProtectedRoute
              exact
              path='/recordharvest'
              component={RecordHarvest}
            />

            <ProtectedRoute
              exact
              path='/recordemployeetraining'
              component={RecordEmployeeTraining}
            />

            <ProtectedRoute
              exact
              path='/recordwaterinspect'
              component={RecordWaterInspect}
            />

            <ProtectedRoute
              exact
              path='/recordwatertreat'
              component={RecordWaterTreat}
            />

            <ProtectedRoute
              exact
              path='/recordmanure'
              component={RecordManure}
            />  

            <ProtectedRoute
              exact
              path='/recordcompostpile'
              component={RecordCompostPile}
            />  

            <ProtectedRoute
              exact
              path='/recordcompostturn'
              component={RecordCompostTurn}
            />  
          
            <ProtectedRoute
              exact
              path='/recordcropsfields'
              component={RecordCropsFieldsLabelCode}
            />

            <ProtectedRoute
              exact
              path='/exportdash'
              component={ExportDash}
            />

            <ProtectedRoute
              exact
              path='/recordfacilitiescooler'
              component={RecordFacilitiesCooler}
            />

            <ProtectedRoute
                exact
                path='/recordfacilitiesbathroom'
                component={RecordFacilitiesBathroom}
            />

            <ProtectedRoute
                exact
                path='/recordfacilitiespacking'
                component={RecordFacilitiesPacking}
            />

            <ProtectedRoute
                exact
                path='/recordfacilitiesother'
                component={RecordFacilitiesOther}
            />

            <ProtectedRoute
                exact
                path='/recordfacilitiescooler'
                component={RecordFacilitiesCooler}
            />

            <ProtectedRoute
                exact
                path='/recordequipmentool'
                component={RecordEquipmentTool}
            />
            
            <ProtectedRoute
                exact
                path='/recordequipmenvehicle'
                component={RecordEquipmentVehicle}
            />

            <ProtectedRoute
                exact
                path='/recordequipmenthermom'
                component={RecordEquipmentThermometer}
            />

            <ProtectedRoute
                exact
                path='/recordequipmentfirstaid'
                component={RecordEquipmentFirstAid}
            />

            <ProtectedRoute
                exact
                path='/recordequipmentpest'
                component={RecordEquipmentPest}
            />

            <ProtectedRoute
                exact
                path='/recordequipmentother'
                component={RecordEquipmentOther}
            />


              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <Typography variant='h6' align="center">Page Could Not Be Found!</Typography>} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);

