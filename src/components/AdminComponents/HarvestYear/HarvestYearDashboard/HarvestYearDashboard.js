import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './HarvestYearDashboard.css'
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import LogoutButton from '../../../LogOutButton/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class HarvestYearDashboard extends Component {


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
              onClick={() => { this.props.history.push('/newharvestyeardashboard') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Create New Harvest Year</Typography>
            </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/edithierarchy') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Edit Current Harvest Year</Typography>
              <FontAwesomeIcon icon="users" style={{ marginLeft: 5 }} className={classes.fabIconColor} />
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
  fabIconColor: {
    color: '#E6CD30',
  },
  fabColor: {
    color: 'white',
  },
  titleColor: {
    color: '#D19124',
  }
});



const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(HarvestYearDashboard)));