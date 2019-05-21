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
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import WaterSource from '../AdminComponents/HarvestYear/NewHarvestYear/NewWater/CreateWaterSources/CreateWaterSources'
import WaterLabel from '../AdminComponents/HarvestYear/NewHarvestYear/NewWater/CreateWaterSourcesLabelCodes/CreateWaterSourcesLabelCodes';
import CropTypes from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateCrops/CreateCrops';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import WorkerDashboard from '../WorkerDashboard/WorkerDashboard';
import NewHarvestYearDate from '../AdminComponents/HarvestYear/NewHarvestYear/SelectNewHarvestYearDate/SelectNewHarvestYearDate';
import EnterFarmInformationHierarchyMenu from '../AdminComponents/HarvestYear/NewHarvestYear/EnterFarmInformationHierarchyMenu/EnterFarmInformationHierarchyMenu';
import CreateManure from '../AdminComponents/HarvestYear/NewHarvestYear/NewManureCompost/CreateManure/CreateManure.js';
import LogDashboard from '../AllUsersComponents/LogForms/LogsHierarchyMenu/LogsHierarchyMenu';
import HarvestLog from '../AllUsersComponents/LogForms/HarvestLog/HarvestLog';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faTint, faSeedling, faTractor, faClipboard, faUsers, faTable } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import FieldTypes from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateFields/CreateFields';
import LabelCode from '../AdminComponents/HarvestYear/NewHarvestYear/NewCrops/CreateLabelCodes/CreateLabelCodes';

library.add(faRecycle, faSeedling, faTint, faTractor, faClipboard, faUsers, faTable);

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
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/home will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will see the info page instead. */}
              <Route
                exact
                path="/info"
                component={InfoPage}
              />

              <Route
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
              path="/about"
              component={AboutPage}
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
              exact
              path="/admin"
              component={AdminDashboard}
            />
            <Route
              exact
              path="/worker"
              component={WorkerDashboard}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <Route
              exact
              path="/home"
              component={UserPage}
            />
            
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <Route
              exact
              path="/info"
              component={InfoPage}
            />
            
              <Route
              exact
              path="/create_manure"
              component={CreateManure}
            />

            <Route
            exact
            path='/logdashboard'
            component={LogDashboard}
            />

            <Route
            exactpath='/harvestlog'
            component={HarvestLog}
            />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);

