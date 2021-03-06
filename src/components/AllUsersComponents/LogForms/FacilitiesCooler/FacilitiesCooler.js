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



class FacilitiesCoolerLog extends Component {


  state= {
      newCoolerLog :{
        cooler_date: '',
        farm_cooler_id: '',
        cooler_temperature: '',
        cooler_cleaned: false,
        cooler_sanitized: false,
        cooler_area: '',
        cooler_comment: '',
        cooler_sig: '',
      }
  }

  
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_COOLER'});
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
        this.setState({
            newCoolerLog:{
              ...this.state.newCoolerLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_COOLER_LOG', payload: this.state.newCoolerLog});
    this.props.history.push('/logdashboard');
  }


  handleError = () => {
    if (this.state.newCoolerLog.cooler_date !== '' && this.state.newCoolerLog.farm_cooler_id !== '' && 
    this.state.newCoolerLog.cooler_sig !== '') {
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
        newCoolerLog:{
        ...this.state.newCoolerLog,
        cooler_cleaned: event.target.checked
      }
    })
  }

  handleCheckSanitized = (event) => {
    
    this.setState({
        newCoolerLog:{
        ...this.state.newCoolerLog,
        cooler_sanitized: event.target.checked
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
         Cooler Maintenance Log
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
              onChange={this.handleChange('cooler_date')}
              value = {
                this.state.newCoolerLog.cooler_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="cooler"
              select
              label="Select Cooler"
              value={this.state.newCoolerLog.farm_cooler_id}
              onChange={this.handleChange('farm_cooler_id')}
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
              <MenuItem disabled>Select Cooler</MenuItem>
              {this.props.reduxState.coolerReducer.map(option => (
                  <MenuItem key={option.farm_cooler_id} value={option.farm_cooler_id}>
                  {option.farm_cooler_name}
                  </MenuItem>
              ))}
           </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Cooler Temperature"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('cooler_temperature')}
            style={{width:'80vw', maxWidth:400}}
            /> 
           </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckCleaned} 
                  value={this.state.cooler_cleaned}
                  checked={this.state.cooler_cleaned}
                />
              }
              label="Cooler Cleaned"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckSanitized} 
                  value={this.state.newCoolerLog.cooler_sanitized}
                  checked={this.state.newCoolerLog.cooler_sanitized}
                />
              }
              label="Cooler Sanitized"
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField 
            label="Cooler Area"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('cooler_area')}
            style={{width:'80vw', maxWidth:400}}
            /> 
           </Grid>
         

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newCoolerLog.cooler_comment}
            onChange={this.handleChange('cooler_comment')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="cooler_signature"
              select
              label="Select Employee Signature"
              value={this.state.newCoolerLog.cooler_sig}
              onChange={this.handleChange('cooler_sig')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(FacilitiesCoolerLog));