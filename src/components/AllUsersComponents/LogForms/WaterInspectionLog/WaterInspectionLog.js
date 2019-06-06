import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Nav from '../../../Nav/Nav';
import './WaterInspectionLog.css'

const moment = require('moment');


class WaterInspectionLog extends Component {


  state= {
    newWaterInspectLog: {
      inspection_date: moment().format('YYYY-MM-DD'),
      inspection_water_source: '',
      distribution: '',
      observation: '',
      inspection_corrective_action: '',
      inspection_signature: ''
    }
  }

    //FUNCTION- validation- conditionally renders submit button based on status of state-- if state contains values then submit button is enabled,
  // if state does not contain values then submit button is disabled (user cannot submit)
  handleError = () => {
    if (this.state.newWaterInspectLog.inspection_date !== '' && this.state.newWaterInspectLog.inspection_water_source !== '' && 
    this.state.newWaterInspectLog.inspection_signature !== '') {
    return (
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} onClick={this.handleSubmit}>Submit</Button>
    ) 
  }
  else {
    return(
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} disabled>Submit</Button>
    )
    }
  }

  //FUNCTION-- on initialization of page-- dispatch GET_PERSON to get employees from DB , store them in reducer, populate drop down menu
  // GET_LABEL_CODE to get label codes from DB, store them in reducer, populate drop down menu
  //GET_WATER_SOURCE to get water sources from DB, store them in reducer, populate drop down menu for water sources
  componentDidMount(){
    this.props.dispatch({type: 'GET_LABEL_CODE'});
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_WATER_SOURCE'})
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
      this.setState({
        newWaterInspectLog:{
          ...this.state.newWaterInspectLog,
          [propertyName]: event.target.value,
        }
      })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new harvest log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_RECORD_WATER_INSPECT', payload: this.state.newWaterInspectLog})
    this.props.history.push('/logdashboard');
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Water Inspection Log
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
              onChange={this.handleChange('inspection_date')}
              value = {
                this.state.newWaterInspectLog.inspection_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="crops"
              select
              label="Select Water Source"
              value={this.state.newWaterInspectLog.inspection_water_source}
              onChange={this.handleChange('inspection_water_source')}
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
              <MenuItem disabled>Select Water Source</MenuItem>
              {this.props.reduxState.waterSetup.waterSource.map(option => (
                  <MenuItem key={option.farm_water_source_id} value={option.farm_water_source_id}>
                  {option.farm_water_source_name}
                  </MenuItem>
              ))}
           </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Distribution System"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('distribution')}
            style={{width:'80vw', maxWidth:400}}
            />
           </Grid>


          <Grid item xs={12} sm={6}>
            <TextField 
            label="Observations"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('observation')}
            style={{width:'80vw', maxWidth:400}}
            /> 
           </Grid>
         

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Corrective Actions"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('inspection_corrective_action')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="inspection_signature"
              select
              label="Select Employee Signature"
              value={this.state.newWaterInspectLog.inspection_signature}
              onChange={this.handleChange('inspection_signature')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(WaterInspectionLog));