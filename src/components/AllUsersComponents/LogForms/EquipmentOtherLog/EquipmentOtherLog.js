import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Nav from '../../../Nav/Nav';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const moment = require('moment');



class EquipmentEquipmentOtherLog extends Component {


  state= {
      newEquipmentOtherLog :{
        equipment_other_date: '',
        farm_equipment_other_id: '',
        equipment_other_comment: '',
        equipment_other_sig: '',
      }
  }

  
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_EQUIPMENT_OTHER'});
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
        this.setState({
            newEquipmentOtherLog:{
              ...this.state.newEquipmentOtherLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_EQUIPMENT_OTHER_LOG', payload: this.state.newEquipmentOtherLog});
    this.props.history.push('/logdashboard');
  }


  handleError = () => {
    if (this.state.newEquipmentOtherLog.equipment_other_date !== '' && this.state.newEquipmentOtherLog.farm_equipment_other_id !== '' && 
    this.state.newEquipmentOtherLog.equipment_other_sig !== '') {
    return (
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} onClick={this.handleSubmit}>Submit</Button>
    ) 
  }
  else {
    return(
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} disabled>Submit</Button>
    )}
  }

  handleCheckStocked = (event) => {
    this.setState({
        newEquipmentOtherLog:{
        ...this.state.newEquipmentOtherLog,
        equipment_other_stocked: event.target.checked
      }
    })
  }




  render() {
    const {classes} = this.props;
    console.log(this.state)
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Other Equipment Maintenance Log
      </Typography>
      <Grid spacing={8}
      container
      direction="column"
      justify="center"
      alignItems="center">
         
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Required"
              style={{width:'80vw', maxWidth:400}}
              onChange={this.handleChange('equipment_other_date')}
              value = {
                this.state.newEquipmentOtherLog.equipment_other_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="equipment"
              select
              label="Select Equipment"
              value={this.state.newEquipmentOtherLog.farm_equipment_other_id}
              onChange={this.handleChange('farm_equipment_other_id')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
              helperText='Required'
              style={{width:'80vw', maxWidth:400}}
            >
              <MenuItem disabled>Select Equipment</MenuItem>
              {this.props.reduxState.equipmentOtherReducer.map(option => (
                  <MenuItem key={option.farm_equipment_other_id} value={option.farm_equipment_other_id}>
                  {option.farm_equipment_other_name}
                  </MenuItem>
              ))}
           </TextField>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newEquipmentOtherLog.equipment_other_comment}
            onChange={this.handleChange('equipment_other_comment')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="equipment_other_signature"
              select
              label="Select Employee Signature"
              value={this.state.newEquipmentOtherLog.equipment_other_sig}
              onChange={this.handleChange('equipment_other_sig')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Required"
              margin="normal"
              variant="outlined"
              style={{width:'80vw', maxWidth:400}}
            >
              <MenuItem disabled>Select Employee Signature</MenuItem>
              {this.props.reduxState.person.map(option => (
                  <MenuItem key={option.person_id} value={option.person_id}>
                  {option.person_first} {option.person_last}
                  </MenuItem>
              ))}
           </TextField>
          </Grid>
          
          <Grid item xs={12} sm={6}>
             <Typography align="center">{this.handleError()}</Typography> 
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
  menu: {
    width: 200,
  }
});


const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(EquipmentEquipmentOtherLog));