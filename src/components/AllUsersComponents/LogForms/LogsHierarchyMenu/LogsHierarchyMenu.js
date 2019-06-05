import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LogsHierarchyMenu.css'
import Nav from '../../../Nav/Nav';
import Fab from '@material-ui/core/Fab';

class LogsHierarchyMenu extends Component {





  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center" className={classes.titleColor}>
      Choose a Category to View Logs
      </Typography>
      <Grid container spacing={24}
        direction="column"
        justify="center"
        alignItems="center">

      <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/harvestlog')}}
              style={{width:'80vw', maxWidth:400}}
            >
              <Typography className={classes.fabColor}>Harvest Traceability</Typography>
              <FontAwesomeIcon icon="seedling" style={{marginLeft: 5}} className={classes.fabIconColor}/>
        </Fab>
        </Grid>
            <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/compostlog')}}
              style={{width:'80vw', maxWidth:400}}
            >
              <Typography className={classes.fabColor}>Compost Management</Typography>
              <FontAwesomeIcon icon="recycle" style={{marginLeft: 5}} className={classes.fabIconColor}/>
        </Fab>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/waterlogdashboard')}}
              style={{width:'80vw', maxWidth:400}}
            >
              <Typography className={classes.fabColor}>Water Sources</Typography>
              <FontAwesomeIcon icon="tint" style={{marginLeft: 5}} className={classes.fabIconColor}/>
        </Fab>
          </Grid>
          {this.props.reduxState.user.user_role === 'admin' ? <Grid item xs={10} sm={6}>
            <Fab
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={() => {this.props.history.push('/employeelog')}}
              style={{width:'80vw', maxWidth:400}}
            >
               <Typography className={classes.fabColor}>Employee Training</Typography>
              <FontAwesomeIcon icon="id-card" style={{marginLeft: 5}} className={classes.fabIconColor} />
        </Fab>
          </Grid> :
          <Fragment></Fragment>
    }
        
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

export default connect( mapReduxStateToProps )(withStyles(styles)(LogsHierarchyMenu));