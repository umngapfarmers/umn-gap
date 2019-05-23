import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './AdminDashboard.css'
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import LogoutButton from '../LogOutButton/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class AdminDashboard extends Component {


  state= {
    
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography align="right"><LogoutButton /></Typography>
      <Typography variant="h6" gutterBottom align="center" className={classes.titleColor}>
          Admin Dashboard
        
      </Typography>
        < Grid container spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
         
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/logdashboard')}}
              style={{width:'80vw', maxWidth:400}}
            >
              <Typography className={classes.fabColor}>Create Logs</Typography>
              <FontAwesomeIcon icon="clipboard" style={{marginLeft: 5}} className={classes.fabIconColor}/>
        </Fab>
        </Grid>
            <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/mangageuser')}}
              style={{width:'80vw', maxWidth:400}}
            >
              <Typography className={classes.fabColor}>Manage Roles</Typography>
              <FontAwesomeIcon icon="users" style={{marginLeft: 5}} className={classes.fabIconColor}/>
        </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/recorddashboard')}}
              style={{width:'80vw', maxWidth:400}}
            >
              <Typography className={classes.fabColor}>View Records</Typography>
              <FontAwesomeIcon icon="table" style={{marginLeft: 5}} className={classes.fabIconColor}/>
        </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/harvestdashboard') }}
              style={{width:'80vw', maxWidth:400}}
            >
               <Typography className={classes.fabColor}>Manage Harvest Year</Typography>
              <FontAwesomeIcon icon="tractor" style={{marginLeft: 5}} className={classes.fabIconColor} />
        </Fab>
          </Grid>
      </Grid>

  </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
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
});


const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AdminDashboard));