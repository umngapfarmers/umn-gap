import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SelectManureCompostRecord.css'
import Nav from '../../../Nav/Nav';
import Fab from '@material-ui/core/Fab';


class SelectManureCompostRecord extends Component {

  //renders select menu for compost record
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Select Manure Compost Record
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
                    onClick={() => {this.props.history.push('/recordmanure')}}
                    >
                      <Typography className={classes.fabColor}>Manure Record</Typography>
                      <FontAwesomeIcon icon="horse" style={{marginLeft: 5}} className={classes.fabIconColor}/>
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
                    onClick={() => {this.props.history.push('/recordcompostpile')}}
                    >
                       <Typography className={classes.fabColor}>Compost Pile Record</Typography>
                      <FontAwesomeIcon icon="recycle" style={{marginLeft: 5}} className={classes.fabIconColor}/>
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
                    onClick={() => {this.props.history.push('/recordcompostturn')}}
                    >
                      <Typography className={classes.fabColor}>Compost Turning Record</Typography>
                      <FontAwesomeIcon icon="thermometer-three-quarters" style={{marginLeft: 5}} className={classes.fabIconColor}/>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(SelectManureCompostRecord));