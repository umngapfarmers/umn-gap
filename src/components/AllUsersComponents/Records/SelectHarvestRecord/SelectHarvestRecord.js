import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from '../../../Nav/Nav';
import Fab from '@material-ui/core/Fab';


class SelectHarvestRecord extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Select Harvest Record
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
                    onClick={() => {this.props.history.push('/recordharvest')}}
                    >
                      <Typography className={classes.fabColor}>Harvest Traceability Record</Typography>
                      <FontAwesomeIcon icon="carrot" style={{marginLeft: 5}} className={classes.fabIconColor}/>
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
                    onClick={() => {this.props.history.push('/recordcropsfields')}}
                    >
                       <Typography className={classes.fabColor}>Crops, Fields, Label Code Record</Typography>
                      <FontAwesomeIcon icon="seedling" style={{marginLeft: 5}} className={classes.fabIconColor}/>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(SelectHarvestRecord));