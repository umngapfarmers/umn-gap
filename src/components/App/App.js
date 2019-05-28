import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import ProtectedRoute from '../Auth/ProtectedRoute/ProtectedRoute';
import AdminProtectedRoute from '../Auth/ProtectedRoute/AdminProtectedRoute';
import WaterSource from '../AdminComponents/HarvestYear/NewHarvestYear/NewWater/CreateWaterSources/CreateWaterSources'
import WaterLabel from '../AdminComponents/HarvestYear/NewHarvestYear/NewWater/CreateWaterSourcesLabelCodes/CreateWaterSourcesLabelCodes';
import CropTypes from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateCrops/CreateCrops';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import WorkerDashboard from '../WorkerDashboard/WorkerDashboard';
import NewHarvestYearDate from '../AdminComponents/HarvestYear/NewHarvestYear/SelectNewHarvestYearDate/SelectNewHarvestYearDate';
import EnterFarmInformationHierarchyMenu from '../AdminComponents/HarvestYear/NewHarvestYear/EnterFarmInformationHierarchyMenu/EnterFarmInformationHierarchyMenu';
import ManureCompostDash from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/ManureCompostDash/ManureCompostDash';
import CreateManure from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/CreateManure/CreateManure.js';
import CreateCompost from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/CreateCompost/CreateCompost.js';
import LogDashboard from '../AllUsersComponents/LogForms/LogsHierarchyMenu/LogsHierarchyMenu';
import HarvestLog from '../AllUsersComponents/LogForms/HarvestLog/HarvestLog';
import EditHierarchy from '../AdminComponents/HarvestYear/EditHarvestYear/EditFarmInformationHierarchyMenu/EditFarmInformationHierarchyMenu';
import HarvestDashboard from '../AdminComponents/HarvestYear/HarvestYearDashboard/HarvestYearDashboard';
import NewHarvestYearDashboard from '../AdminComponents/HarvestYear/NewHarvestYear/NewHarvestDashboard/NewHarvestDashboard';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faTint, faPen, faPlus, faSeedling, faHome, faTractor, faClipboard, faUsers, faTable, faHorse, faIdCard, faVial, faSignOutAlt, faThermometerThreeQuarters, faTrashAlt, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import ManageWorker from '../AdminComponents/ManageRoles/ManageWorker';

import AddWorker from '../AdminComponents/ManageRoles/AddWorker';
import FieldTypes from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateFields/CreateFields';
import LabelCode from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateLabelCodes/CreateLabelCodes';
import WaterLogDashboard from '../AllUsersComponents/LogForms/SelectWaterLog/SelectWaterLog';
// import ManureLogDashboard from '../AllUsersComponents/LogForms/SelectCompostManureLog/SelectCompostManureLog';
// import CompostLog from '../AllUsersComponents/LogForms/CompostManagementLog/CompostManagementLog';
import EmployeeLog from '../AllUsersComponents/LogForms/EmployeeTrainingLog/EmployeeTrainingLog';
import EditCrops from '../AdminComponents/HarvestYear/EditHarvestYear/EditCrops/EditCrops';
import EditWorker from '../AdminComponents/ManageRoles/EditWorker';
import EditEmployee from '../AdminComponents/ManageRoles/EditEmployee';

import CompostLog from '../AllUsersComponents/LogForms/CompostPileLog/CompostPileLog';

import RecordDashboard from '../AllUsersComponents/Records/RecordsHierarchyMenu/RecordsHierarchyMenu';
import RecordHarvest from '../AllUsersComponents/Records/HarvestRecord/HarvestRecord';
import RecordEmployeeTraining from '../AllUsersComponents/Records/EmployeeTrainingRecord/EmployeeTrainingRecord';
import RecordWaterDashboard from '../AllUsersComponents/Records/SelectWaterRecord/SelectWaterRecord';
import RecordManureDashboard from '../AllUsersComponents/Records/SelectManureCompostRecord/SelectManureCompostRecord';
import RecordWaterInspect from '../AllUsersComponents/Records/WaterInspectionRecord/WaterInspectionRecord';
import RecordWaterTreat from '../AllUsersComponents/Records/WaterTreatmentRecord/WaterTreatmentRecord';
import RecordManure from '../AllUsersComponents/Records/ManureRecord/ManureRecord';
import RecordCompostPile from '../AllUsersComponents/Records/CompostPileRecord/CompostPileRecord';
import RecordCompostTurn from '../AllUsersComponents/Records/CompostTurningRecord/CompostTurningRecord';
import WaterInspectLog from '../AllUsersComponents/LogForms/WaterInspectionLog/WaterInspectionLog';
import WaterTreatLog from '../AllUsersComponents/LogForms/WaterTreatmentLog/WaterTreatmentLog';
import EditUser from '../AdminComponents/ManageRoles/EditUser';
import ManageUserAccounts from '../SuperAdmin/ManageUserAccounts/ManageUserAccounts';
library.add(faHome, faRecycle, faPen, faPlus, faSeedling, faTint, faTractor, faClipboard, faUsers, faTable, faHorse, faIdCard, faVial, faSignOutAlt, faThermometerThreeQuarters, faTrashAlt, faMinusCircle);

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
              
              <ProtectedRoute
                exact
                path="/newharvestyear"
                component={NewHarvestYearDate}
              />

              <Route
                exact
                path="/newfarminfo"
                component={EnterFarmInformationHierarchyMenu}
              />

              
          
            <Route
              exact
              path="/water"
              component={WaterSource}
            />
            <Route
              exact
              path="/waterlabel"
              component={WaterLabel}
            />
            <Route
              exact
              path="/crops"
              component={CropTypes}
            />
            <Route
              exact
              path="/field"
              component={FieldTypes}
            />
            <Route
              exact
              path="/labelcode"
              component={LabelCode}
            />
            <Route
              exact
              path="/admin"
              component={AdminDashboard}
            />
            <Route
              exact
              path="/edithierarchy"
              component={EditHierarchy}
            />
            <Route
              exact
              path="/editcrops"
              component={EditCrops}
            />
            <Route
              exact
              path="/harvestdashboard"
              component={HarvestDashboard}
            />
              <Route
                exact
                path="/newharvestyeardashboard"
                component={NewHarvestYearDashboard}
              />
            <Route
              exact
              path="/worker"
              component={WorkerDashboard}
            />
            <Route
              exact
              path="/manageuser"
              component={ManageWorker}
            />
            <Route
              exact
              path="/addworker"
              component={AddWorker}
            />
              <Route
                exact
                path="/editworker"
                component={EditWorker}
              />
              <Route
                exact
                path="/editemployee"
                component={EditEmployee}
              />
              <Route
                exact
                path="/edituser"
                component={EditUser}
              />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
        
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            
            <ProtectedRoute
              exact
              path="/fertilizerdash"
              component={ManureCompostDash}
            />
            
            <ProtectedRoute
              exact
              path="/createmanure"
              component={CreateManure}
            />

            <ProtectedRoute
              exact
              path="/createcompost"
              component={CreateCompost}
            />

            <Route
              exact
              path='/logdashboard'
              component={LogDashboard}
            />

            <Route
              exact
              path='/harvestlog'
              component={HarvestLog}
            />

            <Route
              exact
              path='/waterlogdashboard'
              component={WaterLogDashboard}
            />    

            <ProtectedRoute
              exact
              path = '/compostlog'
              component={CompostLog}
            /> 

            <Route
              exact
              path='/employeelog'
              component={EmployeeLog}
            />

            <Route
              exact
              path="/watertreatlog"
              component={WaterTreatLog}
            />

            <Route
              exact
              path="/waterinspectlog"
              component={WaterInspectLog}
            />

            <Route
            exact
            path="/recorddashboard"
            component={RecordDashboard}
            />

            <Route
            exact
            path='/recordharvest'
            component={RecordHarvest}
            />

            <Route
            exact
            path='/recordemployeetraining'
            component={RecordEmployeeTraining}
            />

            <Route
            exact
            path='/recordwaterdashboard'
            component={RecordWaterDashboard}
            />

            <Route
            exact
            path='/recordmanuredashboard'
            component={RecordManureDashboard}
            />

            <Route
            exact
            path='/recordwaterinspect'
            component={RecordWaterInspect}
            />

            <Route
            exact
            path='/recordwatertreat'
            component={RecordWaterTreat}
            />

          <Route
            exact
            path='/recordmanure'
            component={RecordManure}
            />  

          <Route
            exact
            path='/recordcompostpile'
            component={RecordCompostPile}
            />  

          <Route
            exact
            path='/recordcompostturn'
            component={RecordCompostTurn}
            />  
          
          <Route
            exact
            path='/manageuseraccounts'
            component={ManageUserAccounts}
            />


            {/* <Route
            exact
            path = '/manurelogdashboard' 
            component={ManureLogDashboard}
            /> */}
            

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);

