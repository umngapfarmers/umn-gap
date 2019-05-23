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
import './SelectWaterLog.css'


class SelectWaterLog extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
         Select Water Log
      </Typography>
      <Grid container spacing={24}>
         
          <Grid item xs={12} sm={6}>
          <List>
              <ListItem button onClick={() => {this.props.history.push('/watertreatlog')}}>
                <ListItemText primary="Water Treatment"/>
                < ListItemIcon>
                  <FontAwesomeIcon icon="vial" />
              </ListItemIcon>
              </ListItem>
              <ListItem button onClick={() => {this.props.history.push('/waterinspectlog')}}>
              <ListItemText primary="Water Inspection"/>
              <ListItemIcon>
                  <FontAwesomeIcon icon="tint"/>
                </ListItemIcon>
              </ListItem>
          </List>  
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
});




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(SelectWaterLog));