import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import './EmployeeTrainingLog.css'


class EmployeeTrainingLog extends Component {


  state= {
    newTraining: {
      topic: '',
      person_id: '',
      trainer_name: '',
      date_trained: '',
      employee_training_sig: '',
    }
  }
  componentDidMount(){
    this.props.dispatch({type: 'GET_PERSON'});
  }

 
  handleChange = (propertyName) => {
    return (event) => {
      this.setState({
        newTraining:{
          ...this.state.newTraining,
          [propertyName]: event.target.value,
        }
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
  }




  render() {
    const {classes} = this.props;
    console.log(this.state.newTraining);
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
         Employee Training Log
      </Typography>
      <Grid spacing={24}
      container
      direction="column"
      justify="center"
      alignItems="center">
         
          <Grid item xs={12} sm={6}>
              <TextField
              id="topic"
              label="Topic"
              className={classes.textField}
              value={this.state.newTraining.topic}
              onChange={this.handleChange('topic')}
              margin="normal"
              variant="outlined"
              style={{width:'80vw', maxWidth:400}}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
              <TextField
              id="person_id"
              select
              label="Employee Trained"
              value={this.state.newTraining.person_id}
              onChange={this.handleChange('person_id')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
              style={{width:'80vw', maxWidth:400}}
            >
              <MenuItem disabled>Select the employee trained</MenuItem>
              {this.props.reduxState.person.map(option => (
                <MenuItem key={option.person_id} value={option.person_id}>
                  {option.person_first} {option.person_last}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
                id="trainer"
                label="Trainer"
                value={this.state.newTraining.trainer_name}
                onChange={this.handleChange('trainer_name')}
                margin="normal"
                variant="outlined"
                style={{width:'80vw', maxWidth:400}}
              />
          </Grid>

          <Grid item xs={12} sm={6}>
              <TextField
              id="date_trained"
              label="Date Trained"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('date_trained')}
              style={{width:'80vw', maxWidth:400}}
              />


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

export default connect( mapReduxStateToProps )(withStyles(styles)(EmployeeTrainingLog));