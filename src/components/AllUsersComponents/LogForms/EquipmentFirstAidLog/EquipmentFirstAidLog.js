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



class EquipmentFirstAidLog extends Component {


  state= {
      newFirstAidLog :{
        firstaid_date: '',
        farm_firstaid_id: '',
        firstaid_stocked: false,
        firstaid_comment: '',
        firstaid_sig: '',
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
            newFirstAidLog:{
              ...this.state.newFirstAidLog,
              [propertyName]: event.target.value,
            }
        })
    }
  }

      //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new water inspection log,
  // navigates user to logs dashboard
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_FIRSTAID_LOG', payload: this.state.newFirstAidLog});
    // this.props.history.push('/logdashboard');
  }


  handleError = () => {
    if (this.state.newFirstAidLog.firstaid_date !== '' && this.state.newFirstAidLog.farm_firstaid_id !== '' && 
    this.state.newFirstAidLog.firstaid_sig !== '') {
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
        newFirstAidLog:{
        ...this.state.newFirstAidLog,
        firstaid_stocked: event.target.checked
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
         First Aid Maintenance Log
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
              onChange={this.handleChange('firstaid_date')}
              value = {
                this.state.newFirstAidLog.firstaid_date
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="firstaid"
              select
              label="Select First Aid"
              value={this.state.newFirstAidLog.farm_firstaid_id}
              onChange={this.handleChange('farm_firstaid_id')}
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
              <MenuItem disabled>Select FirstAid</MenuItem>
              {/* {this.props.reduxState.firstaidReducer.map(option => (
                  <MenuItem key={option.farm_firstaid_id} value={option.farm_firstaid_id}>
                  {option.farm_firstaid_name}
                  </MenuItem>
              ))} */}
           </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheckStocked} 
                  value={this.state.firstaid_stocked}
                  checked={this.state.firstaid_stocked}
                />
              }
              label="First Aid Stocked"
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Comments"
            margin="normal"
            variant="outlined"
            value={this.state.newFirstAidLog.firstaid_comment}
            onChange={this.handleChange('firstaid_comment')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12} sm={6}>
            <TextField
              id="firstaid_signature"
              select
              label="Select Employee Signature"
              value={this.state.newFirstAidLog.firstaid_sig}
              onChange={this.handleChange('firstaid_sig')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EquipmentFirstAidLog));