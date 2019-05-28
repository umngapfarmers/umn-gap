import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Nav from '../../../Nav/Nav';
import './WaterTreatmentLog.css'



class WaterTreatmentLog extends Component {


  state= {
    newWaterTreatmentLog: {
      treatment_date: '',
      farm_water_source_id: '',
      water_ph: '',
      water_temp: '',
      turbidity: '',
      sanitizer: '',
      corrective_action: '',
      treatment_sig: ''
    }
  }

  handleError = () => {
    if (this.state.newWaterTreatmentLog.treatment_date !== '' && this.state.newWaterTreatmentLog.farm_water_source_id !== '' && 
    this.state.newWaterTreatmentLog.treatment_sig !== '') {
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

  componentDidMount(){
    this.props.dispatch({type: 'GET_LABEL_CODE'});
    this.props.dispatch({type: 'GET_PERSON'});
    this.props.dispatch({type: 'GET_WATER_SOURCE'})
  }

  handleChange = (propertyName) => {
    return (event) => {
      this.setState({
        newWaterTreatmentLog:{
          ...this.state.newWaterTreatmentLog,
          [propertyName]: event.target.value,
        }
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.dispatch({type: 'ADD_RECORD_WATER_TREAT', payload: this.state.newWaterTreatmentLog})
    this.props.history.push('/logdashboard');
  }




  render() {
    const {classes} = this.props;
    console.log(this.state.newWaterTreatmentLog);
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Water Treatment Log
      </Typography>
      <Grid spacing={8}
      container
      direction="column"
      justify="center"
      alignItems="center">
         
          <Grid item xs={12} >
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
            onChange={this.handleChange('treatment_date')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="crops"
              select
              label="Select Water Source"
              value={this.state.newWaterTreatmentLog.farm_water_source_id}
              helperText="Required"
              onChange={this.handleChange('farm_water_source_id')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
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
      
          <Grid
            container
            item
            xs={12}
            spacing={16}
            justify="center"
            alignItems="center">

                
          <Grid item xs={4} align="right" >
            <TextField 
            label="pH"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('water_ph')}
            />
          </Grid>


          <Grid item xs={4}>
            <TextField 
            label="Temp"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('water_temp')}
            /> 
          </Grid>
          </Grid>

           <Grid item xs={12}>
            <TextField 
            label="Turbidity"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('turbidity')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>

          <Grid item xs={12}>
            <TextField 
            label="Sanitizer"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('sanitizer')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
         

          <Grid item xs={12}>
            <TextField 
            label="Corrective Actions"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('corrective_action')}
            style={{width:'80vw', maxWidth:400}}
            /> 
          </Grid>
        


          <Grid item xs={12}>
            <TextField
              id="inspection_signature"
              select
              label="Select Employee Signature"
              value={this.state.newWaterTreatmentLog.treatment_sig}
              onChange={this.handleChange('treatment_sig')}
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
  },
});


const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(WaterTreatmentLog));