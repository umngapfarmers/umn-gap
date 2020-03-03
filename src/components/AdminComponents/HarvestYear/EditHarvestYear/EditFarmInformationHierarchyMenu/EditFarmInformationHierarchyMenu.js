import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './EditFarmInformationHierarchyMenu.css'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import LogoutButton from '../../../../LogOutButton/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from '../../../../Nav/Nav';

class EditFarmInformationHierarchyMenu extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        
        <Nav />
        < Grid container spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom align="center" className={classes.titleColor}>
              Select Category to Edit Information
    
            </Typography>   

          </Grid>

          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/editcrops') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Crops, Fields, Label Codes</Typography>
              <FontAwesomeIcon icon="clipboard" style={{ marginLeft: 5 }} className={classes.fabIconColor} />
            </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/editmanure') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Manure and Compost</Typography>
              <FontAwesomeIcon icon="clipboard" style={{ marginLeft: 5 }} className={classes.fabIconColor} />
            </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/editwater') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Water Sources</Typography>
              <FontAwesomeIcon icon="clipboard" style={{ marginLeft: 5 }} className={classes.fabIconColor} />
            </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/editfacilities') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Facilities</Typography>
              <FontAwesomeIcon icon="clipboard" style={{ marginLeft: 5 }} className={classes.fabIconColor} />
            </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => { this.props.history.push('/editequipment') }}
              style={{ width: '80vw', maxWidth: 400 }}
            >
              <Typography className={classes.fabColor}>Equipment</Typography>
              <FontAwesomeIcon icon="clipboard" style={{ marginLeft: 5 }} className={classes.fabIconColor} />
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EditFarmInformationHierarchyMenu));