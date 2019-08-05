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



class EquipmentThermometerLog extends Component {


  state= {
      newThermometerLog :{
        thermometer_date: '',
        farm_thermometer_id: '',
        thermometer_calibrate: false,
        thermometer_comment: '',
        thermometer_sig: '',
      }
  }

  
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_THERMOMETER'});
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
        this.setState({
            newThermometerLog:{
              ...this.state.newThermometerLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_THERMOMETER_LOG', payload: this.state.newThermometerLog});
    this.props.history.push('/logdashboard');
  }


  handleError = () => {
    if (this.state.newThermometerLog.thermometer_date !== '' && this.state.newThermometerLog.farm_thermometer_id !== '' && 
    this.state.newThermometerLog.thermometer_sig !== '') {
    return (
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} onClick={this.handleSubmit}>Submit</Button>
    ) 
  }
  else {
    return(
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} disabled>Submit</Button>
    )}
  }

  handleCheckCalibrate = (event) => {
    this.setState({
        newThermometerLog:{
        ...this.state.newThermometerLog,
        thermometer_calibrate: event.target.checked
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
         Thermometer Maintenance Log
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
              onChange={this.handleChange('thermometer_date')}
              value = {
                this.state.newThermometerLog.thermometer_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="thermometer"
              select
              label="Select Thermometer"
              value={this.state.newThermometerLog.farm_thermometer_id}
              onChange={this.handleChange('farm_thermometer_id')}
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
              <MenuItem disabled>Select Thermometer</MenuItem>
              {/* {this.props.reduxState.thermometerReducer.map(option => (
                  <MenuItem key={option.farm_thermometer_id} value={option.farm_thermometer_id}>
                  {option.farm_thermometer_name}
                  </MenuItem>
              ))} */}
           </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckCalibrate} 
                  value={this.state.thermometer_calibrate}
                  checked={this.state.thermometer_calibrate}
                />
              }
              label="Thermometer Calibrate"
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newThermometerLog.thermometer_comment}
            onChange={this.handleChange('thermometer_comment')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="thermometer_signature"
              select
              label="Select Employee Signature"
              value={this.state.newThermometerLog.thermometer_sig}
              onChange={this.handleChange('thermometer_sig')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EquipmentThermometerLog));