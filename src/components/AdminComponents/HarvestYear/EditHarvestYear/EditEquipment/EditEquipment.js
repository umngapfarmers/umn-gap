import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from '../../../../Nav/Nav.js';


class EditEquipment extends Component {

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Select Equipment to Edit
      </Typography>
      <Grid container spacing={24}
        direction="column"
        justify="center"
        alignItems="center">

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick={() => {this.props.history.push('/editTools')}}
                    >
                       <Typography className={classes.fabColor}>Tools</Typography>
                      <FontAwesomeIcon icon="toolbox" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                  </Fab>
              </Grid>

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick={() => {this.props.history.push('/editVehicles')}}
                    >
                       <Typography className={classes.fabColor}>Vehicles</Typography>
                      <FontAwesomeIcon icon="truck-pickup" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                  </Fab>
              </Grid>

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick={() => {this.props.history.push('/editThermometers')}}
                    >
                       <Typography className={classes.fabColor}>Thermometers</Typography>
                      <FontAwesomeIcon icon="thermometer-half" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                  </Fab>
              </Grid>

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick={() => {this.props.history.push('/editFirstaid')}}
                    >
                       <Typography className={classes.fabColor}>First Aid</Typography>
                      <FontAwesomeIcon icon="first-aid" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                  </Fab>
              </Grid>

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick={() => {this.props.history.push('/editPests')}}
                    >
                       <Typography className={classes.fabColor}>Pests</Typography>
                      <FontAwesomeIcon icon="spider" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                  </Fab>
              </Grid>

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick = {
                      () => {
                        this.props.history.push('/editOtherEquipment')
                      }
                    }
                    >
                       <Typography className={classes.fabColor}>Other Equipment</Typography>
                      <FontAwesomeIcon icon="tools" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                  </Fab>
              </Grid>

              <Grid item xs={12} sm={6}>
                 <Fab 
                    variant="extended"
                    size="large"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    style={{width:'80vw', maxWidth:400}}
                    onClick = {
                      () => {
                        this.props.history.push('/edithierarchy');
                        this.props.dispatch({
                          type: "SET_MENU_BOOLEAN",
                          payload: 4
                        })
                      }
                    }
                    >
                       <Typography className={classes.fabColor}>Back</Typography>
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

export default connect(mapReduxStateToProps)(withStyles(styles)(EditEquipment));