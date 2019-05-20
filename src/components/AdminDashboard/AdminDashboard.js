import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './AdminDashboard.css'
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import LogoutButton from '../LogOutButton/LogOutButton';


class AdminDashboard extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
          <h1>Admin Dashboard </h1>
        
      </Typography>
      <Grid container spacing={40}>
         
          <Grid item xs={6} sm={12}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
            >
              <NavigationIcon className={classes.extendedIcon} />
              Logs
        </Fab>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
            >
              <NavigationIcon className={classes.extendedIcon} />
              Roles
        </Fab>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
            >
              <NavigationIcon className={classes.extendedIcon} />
              Records
        </Fab>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
            >
              <NavigationIcon className={classes.extendedIcon} />
              Harvest Year
        </Fab>
          </Grid>
          <LogoutButton />
      </Grid>
     
  </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
      //display: 'flex',
      //flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  }
});


const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AdminDashboard));