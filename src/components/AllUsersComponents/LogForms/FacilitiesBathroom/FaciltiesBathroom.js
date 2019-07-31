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



class FacilitiesBathroomLog extends Component {


  state= {
      newBathroomLog :{
        bathroom_date: '',
        farm_bathroom_id: '',
        bathroom_cleaned: false,
        bathroom_sanitized: false,
        bathroom_area: '',
        bathroom_comments: '',
        bathroom_sig: '',
      }
  }

  
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
        this.setState({
            newBathroomLog:{
              ...this.state.newBathroomLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
  }


  handleError = () => {
    if (this.state.newBathroomLog.bathroom_date !== '' && this.state.newBathroomLog.farm_bathroom_id !== '' && 
    this.state.newBathroomLog.bathroom_sig !== '') {
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
        newBathroomLog:{
        ...this.state.newBathroomLog,
        bathroom_cleaned: event.target.checked
      }
    })
  }

  handleCheckSanitized = (event) => {
    
    this.setState({
        newBathroomLog:{
        ...this.state.newBathroomLog,
        bathroom_sanitized: event.target.checked
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
         Bathroom Maintenance Log
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
              onChange={this.handleChange('bathroom_date')}
              value = {
                this.state.newBathroomLog.bathroom_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="bathroom"
              select
              label="Select Bathroom"
              value={this.state.newBathroomLog.farm_bathroom_id}
              onChange={this.handleChange('farm_bathroom_id')}
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
              <MenuItem disabled>Select Bathroom</MenuItem>
              {/* {this.props.reduxState.bathroom.waterSource.map(option => (
                  <MenuItem key={option.farm_water_source_id} value={option.farm_water_source_id}>
                  {option.farm_water_source_name}
                  </MenuItem>
              ))} */}
           </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckCleaned} 
                  value={this.state.bathroom_cleaned}
                  checked={this.state.bathroom_cleaned}
                />
              }
              label="Bathroom Cleaned"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckSanitized} 
                  value={this.state.newBathroomLog.bathroom_sanitized}
                  checked={this.state.newBathroomLog.bathroom_sanitized}
                />
              }
              label="Bathroom Sanitized"
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField 
            label="Bathroom Area"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('bathroom_area')}
            style={{width:'80vw', maxWidth:400}}
            /> 
           </Grid>
         

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newBathroomLog.bathroom_comments}
            onChange={this.handleChange('bathroom_comments')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="bathroom_signature"
              select
              label="Select Employee Signature"
              value={this.state.newBathroomLog.bathroom_sig}
              onChange={this.handleChange('bathroom_sig')}
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
              {/* <MenuItem disabled>Select Employee Signature</MenuItem> */}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(FacilitiesBathroomLog));