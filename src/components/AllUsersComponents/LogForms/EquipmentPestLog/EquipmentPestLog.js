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



class EquipmentPestLog extends Component {


  state= {
      newPestLog :{
        pest_date: '',
        farm_pest_id: '',
        pest_adminstrator: '',
        pest_comment: '',
        pest_sig: '',
      }
  }

  
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_FIRSTAID'});
  }


    //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleChange = (propertyName) => {
    return (event) => {
        this.setState({
            newPestLog:{
              ...this.state.newPestLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_FIRSTAID_LOG', payload: this.state.newPestLog});
    this.props.history.push('/logdashboard');
  }


  handleError = () => {
    if (this.state.newPestLog.pest_date !== '' && this.state.newPestLog.farm_pest_id !== '' && 
    this.state.newPestLog.pest_sig !== '') {
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
        newPestLog:{
        ...this.state.newPestLog,
        pest_stocked: event.target.checked
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
         Pest Control Maintenance Log
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
              onChange={this.handleChange('pest_date')}
              value = {
                this.state.newPestLog.pest_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="pest"
              select
              label="Select Pest Control Location"
              value={this.state.newPestLog.farm_pest_id}
              onChange={this.handleChange('farm_pest_id')}
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
              <MenuItem disabled>Select Pest Control Location</MenuItem>
              {/* {this.props.reduxState.pestReducer.map(option => (
                  <MenuItem key={option.farm_pest_id} value={option.farm_pest_id}>
                  {option.farm_pest_location}
                  </MenuItem>
              ))} */}
           </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Pest Control Adminstrated By"
            margin="normal"
            variant="outlined"
            value={this.state.newPestLog.pest_adminstrator}
            onChange={this.handleChange('pest_adminstrator')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newPestLog.pest_comment}
            onChange={this.handleChange('pest_comment')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="pest_signature"
              select
              label="Select Employee Signature"
              value={this.state.newPestLog.pest_sig}
              onChange={this.handleChange('pest_sig')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EquipmentPestLog));