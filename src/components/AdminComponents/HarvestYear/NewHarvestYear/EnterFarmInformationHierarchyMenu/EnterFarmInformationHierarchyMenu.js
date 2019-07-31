import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonUncheckedOutlined from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import './EnterFarmInformationHierarchyMenu.css'


class EnterFarmInformationHierarchyMenu extends Component {

  componentDidMount(){
    // this.props.dispatch({type:'SET_MENU_BOOLEAN', payload: 0})
  }

  render() {
    const {classes} = this.props;
    let menuBoolean = this.props.reduxState.farmMenuConditional;
    let menuToDisplay = null;

    //CONDITIONAL RENDERING -- no menu sections have been completed
    if (menuBoolean === 0){
      menuToDisplay =
      <List>
      <ListItem button onClick={() => {this.props.history.push('/crops')}}>
        <ListItemIcon>
          Step 1
        </ListItemIcon>
        <ListItemText primary="Crops, Fields and Label Codes"/>
        <ListItemIcon>
          <RadioButtonUncheckedOutlined/>
        </ListItemIcon>
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>
          Step 2
        </ListItemIcon>
        <ListItemText primary="Manure and Compost"/>
        <ListItemIcon>
          <RadioButtonUncheckedOutlined/>
        </ListItemIcon>
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>
          Step 3
        </ListItemIcon>
        <ListItemText primary="Water Sources"/>
        <ListItemIcon>
          <RadioButtonUncheckedOutlined/>
        </ListItemIcon>
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>
          Step 4
        </ListItemIcon>
        <ListItemText primary="Equipment"/>
        <ListItemIcon>
          <RadioButtonUncheckedOutlined/>
        </ListItemIcon>
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>
          Step 5
        </ListItemIcon>
        <ListItemText primary="Facilties"/>
        <ListItemIcon>
          <RadioButtonUncheckedOutlined/>
        </ListItemIcon>
      </ListItem>

    </List> 
    }

      //CONDITIONAL RENDERING -- crop, fields and label code  section has been completed
      if (menuBoolean ===1){
        menuToDisplay =
        <List>
        <ListItem button onClick={() => {this.props.history.push('/crops')}}>
          <ListItemIcon>
            Step 1
          </ListItemIcon>
          <ListItemText primary="Crops, Fields and Label Codes"/>
          <ListItemIcon>
            <CheckCircleOutline/>
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => {this.props.history.push('/fertilizerdash')}}>
          <ListItemIcon>
            Step 2
          </ListItemIcon>
          <ListItemText primary="Manure and Compost"/>
          <ListItemIcon>
            <RadioButtonUncheckedOutlined/>
          </ListItemIcon>
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            Step 3
          </ListItemIcon>
          <ListItemText primary="Water Sources"/>
          <ListItemIcon>
            <RadioButtonUncheckedOutlined/>
          </ListItemIcon>
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            Step 4
          </ListItemIcon>
          <ListItemText primary="Equipment"/>
          <ListItemIcon>
            <RadioButtonUncheckedOutlined/>
          </ListItemIcon>
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            Step 5
          </ListItemIcon>
          <ListItemText primary="Facilties"/>
          <ListItemIcon>
            <RadioButtonUncheckedOutlined/>
          </ListItemIcon>
        </ListItem>
      </List> 
      }

        //CONDITIONAL RENDERING -- no menu sections have been completed
    if (menuBoolean ===2){
      menuToDisplay =
      <List>
      <ListItem button onClick={() => {this.props.history.push('/crop')}}>
        <ListItemIcon>
          Step 1
        </ListItemIcon>
        <ListItemText primary="Crops, Fields and Label Codes"/>
        <ListItemIcon>
          <CheckCircleOutline/>
        </ListItemIcon>
      </ListItem>
      <ListItem button onClick={() => {this.props.history.push('/create_manure')}}>
        <ListItemIcon>
          Step 2
        </ListItemIcon>
        <ListItemText primary="Manure and Compost"/>
        <ListItemIcon>
          <CheckCircleOutline/>
        </ListItemIcon>
      </ListItem>
      <ListItem button onClick={() => {this.props.history.push('/water')}}>
        <ListItemIcon>
          Step 3
        </ListItemIcon>
        <ListItemText primary="Water Sources"/>
        <ListItemIcon>
          <RadioButtonUncheckedOutlined/>
        </ListItemIcon>
      </ListItem>
        <ListItem button onClick={() => {this.props.history.push('/newEquipment')}}>
          <ListItemIcon>
            Step 4
          </ListItemIcon>
          <ListItemText primary="Equipment"/>
          <ListItemIcon>
            <RadioButtonUncheckedOutlined/>
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            Step 5
          </ListItemIcon>
          <ListItemText primary="Facilties"/>
          <ListItemIcon>
            <RadioButtonUncheckedOutlined/>
          </ListItemIcon>
        </ListItem>
    </List> 
    }


    return (
      <React.Fragment>
      
      <Typography variant="h6" gutterBottom align="center">
      Enter Farm Information
      </Typography>
      <Grid container spacing={24}>
         
          <Grid item xs={12} sm={6}>
            {menuToDisplay}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EnterFarmInformationHierarchyMenu));