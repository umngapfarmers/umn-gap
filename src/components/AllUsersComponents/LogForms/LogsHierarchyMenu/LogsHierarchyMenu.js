import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LogsHierarchyMenu.css'
import Nav from '../../../Nav/Nav';


class LogsHierarchyMenu extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
      Choose a Category to View Logs
      </Typography>
      <Grid container spacing={24}
        direction="column"
        justify="center"
        alignItems="center">
         
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem button onClick={() => {this.props.history.push('/harvestlog')}}>
                <ListItemText primary="Harvest Traceability"/>
                < ListItemIcon>
                  <FontAwesomeIcon icon="seedling" />
              </ListItemIcon>
              </ListItem>
              <ListItem button onClick={() => {this.props.history.push('/compostlog')}}>
              <ListItemText primary="Compost Management"/>
              <ListItemIcon>
                  <FontAwesomeIcon icon="recycle"/>
                </ListItemIcon>
              </ListItem>
              <ListItem button onClick={() => {this.props.history.push('/waterlogdashboard')}}>
                <ListItemText primary="Water Sources"/>
                <ListItemIcon>
                <FontAwesomeIcon icon="tint" />
                </ListItemIcon>
              </ListItem>
              <ListItem button onClick={() => {this.props.history.push('/employeelog')}}>
                <ListItemText primary="Employee Training"/>
                <ListItemIcon>
                <FontAwesomeIcon icon="id-card" />
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

export default connect( mapReduxStateToProps )(withStyles(styles)(LogsHierarchyMenu));