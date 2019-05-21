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

  navToLogDashboard = () => {
    this.props.history.push('/logdashboard');
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
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
              onClick={this.navToLogDashboard}
              style={{width:'80vw'}}
            >
              Create Logs
              <FontAwesomeIcon icon="clipboard" style={{marginLeft: 5}} />
        </Fab>
        </Grid>
            <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              style={{width:'80vw'}}
            >
              Manage Roles
              <FontAwesomeIcon icon="users" style={{marginLeft: 5}} />
        </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              style={{width:'80vw'}}
            >
              <NavigationIcon className={classes.extendedIcon} />
              View Records
        </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              style={{width:'80vw'}}
            >
               Manage Harvest Year
              <FontAwesomeIcon icon="tractor" style={{marginLeft: 5}} />
        </Fab>
          </Grid>
      </Grid>
        <LogoutButton />

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
  }
});


const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(AdminDashboard));