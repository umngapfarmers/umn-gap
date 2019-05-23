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
import './SelectManureCompostRecord.css'
import Nav from '../../../Nav/Nav';


class SelectManureCompostRecord extends Component {


  state= {
    
  }




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
             <List>
                 <ListItem button onClick={() => {this.props.history.push('/recordmanure')}}>
                   <ListItemText primary="Manure Record"/>
                   < ListItemIcon>
                     <FontAwesomeIcon icon="horse" />
                 </ListItemIcon>
                 </ListItem>

                 <ListItem button onClick={() => {this.props.history.push('/recordcompostpile')}}>
                 <ListItemText primary="Compost Pile Record"/>
                 <ListItemIcon>
                     <FontAwesomeIcon icon="recycle"/>
                   </ListItemIcon>
               </ListItem>

               <ListItem button onClick={() => {this.props.history.push('/recordcompostturn')}}>
                 <ListItemText primary="Compost Turning Record"/>
                 <ListItemIcon>
                     <FontAwesomeIcon icon="thermometer-three-quarters"/>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(SelectManureCompostRecord));