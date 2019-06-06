import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import LogoutButton from '../../LogOutButton/LogOutButton';
import ManageUserAccountsTable from './ManageUserAccountsTable';

class ManageUserAccounts extends Component {

  //FUNCTION- on initilization gets all user from database based on farm id
  componentDidMount(){
      this.props.dispatch({type: 'GET_ALL_USERS'})
  }

  //renders nav for superadmin page
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
         <AppBar position="static" className={classes.appbar}>
            <Toolbar>
            <IconButton
                    onClick={() => {this.props.history.push('/')}}
                    color="inherit"
                  >
                     <HomeIcon />
                  </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                
              </Typography>
              <LogoutButton/>
              <FontAwesomeIcon icon="sign-out-alt"  style={{color: '#white',
                marginRight: 5}}/>  
            </Toolbar>
          </AppBar>
      <Typography variant="h6" gutterBottom align="center" className={classes.titleColor}>
         Manage User Accounts
      </Typography>
      <Grid 
      container spacing={24}
      container
      direction="column"
      justify="center"
      alignItems="center">
         
        <Grid item xs={12} sm={6}>
            <ManageUserAccountsTable/>
        </Grid>

      </Grid>
     
  </React.Fragment>
    );
  }
}


const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    fabIconColor:{
      color: '#7690B8',
      marginRight: 5,
    },
    appbar:{
        backgroundColor: '#676B36',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    fabIconColor:{
      color: '#E6CD30',
    },
    fabColor:{
      color: 'white',
    },
    titleColor:{
      color: '#D19124',
    }
  }
  



const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ManageUserAccounts));