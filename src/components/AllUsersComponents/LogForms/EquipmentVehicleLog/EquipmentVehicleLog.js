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



class EquipmentVehicleLog extends Component {


  state= {
      newVehicleLog :{
        vehicle_date: '',
        farm_vehicle_id: '',
        vehicle_cleaned: false,
        vehicle_comment: '',
        vehicle_sig: '',
      }
  }

  
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_VEHICLE'});
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
        this.setState({
            newVehicleLog:{
              ...this.state.newVehicleLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_VEHICLE_LOG', payload: this.state.newVehicleLog});
    // this.props.history.push('/logdashboard');
  }


  handleError = () => {
    if (this.state.newVehicleLog.vehicle_date !== '' && this.state.newVehicleLog.farm_vehicle_id !== '' && 
    this.state.newVehicleLog.vehicle_sig !== '') {
    return (
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} onClick={this.handleSubmit}>Submit</Button>
    ) 
  }
  else {
    return(
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} disabled>Submit</Button>
    )}
  }

  handleCheckCleaned = (event) => {
    this.setState({
        newVehicleLog:{
        ...this.state.newVehicleLog,
        vehicle_cleaned: event.target.checked
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
         Vehicle Maintenance Log
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
              onChange={this.handleChange('vehicle_date')}
              value = {
                this.state.newVehicleLog.vehicle_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="vehicle"
              select
              label="Select Vehicle"
              value={this.state.newVehicleLog.farm_vehicle_id}
              onChange={this.handleChange('farm_vehicle_id')}
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
              <MenuItem disabled>Select Vehicle</MenuItem>
              {/* {this.props.reduxState.vehicleReducer.map(option => (
                  <MenuItem key={option.farm_vehicle_id} value={option.farm_vehicle_id}>
                  {option.farm_vehicle_name}
                  </MenuItem>
              ))} */}
           </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckCleaned} 
                  value={this.state.vehicle_cleaned}
                  checked={this.state.vehicle_cleaned}
                />
              }
              label="Vehicle Cleaned"
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newVehicleLog.vehicle_comment}
            onChange={this.handleChange('vehicle_comment')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="vehicle_signature"
              select
              label="Select Employee Signature"
              value={this.state.newVehicleLog.vehicle_sig}
              onChange={this.handleChange('vehicle_sig')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EquipmentVehicleLog));