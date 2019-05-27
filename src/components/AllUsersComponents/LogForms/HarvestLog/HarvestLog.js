import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Nav from '../../../Nav/Nav';
import './HarvestLog.css'



class HarvestLog extends Component {


  state= {
    newHarvestLog: {
      crop_harvest_date: '',
      crop_harvest_amount: '',
      crop_harvest_sig: '',
      label_code_id: '',
    }
  }

  handleError = () => {
    if (this.state.newHarvestLog.crop_harvest_date !== '' && this.state.newHarvestLog.crop_harvest_amount !== '' && 
    this.state.newHarvestLog.crop_harvest_sig !== '' && this.state.newHarvestLog.label_code_id !== '') {
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
  }

  handleChange = (propertyName) => {
    return (event) => {
      this.setState({
        newHarvestLog:{
          ...this.state.newHarvestLog,
          [propertyName]: event.target.value,
        }
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    this.props.dispatch({type:'ADD_HARVEST_LOG', payload: this.state.newHarvestLog});
    this.props.history.push('/logdashboard')
  }




  render() {
    const {classes} = this.props;
    console.log(this.state.newHarvestLog);
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Harvest Tracking Log
      </Typography>
      <Grid spacing={24}
      container
      direction="column"
      justify="center"
      alignItems="center">
         
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Date Harvested"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
            }}
            helperText="Required"
            style={{width:'80vw', maxWidth:400}}
            onChange={this.handleChange('crop_harvest_date')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="crops"
              select
              label="Select Crop and Field Label Code"
              value={this.state.newHarvestLog.label_code_id}
              onChange={this.handleChange('label_code_id')}
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
              <MenuItem disabled>Select Crop and Field Label Code</MenuItem>
              {this.props.reduxState.labelCode.map(option => (
                  <MenuItem key={option.label_code_id} value={option.label_code_id}>
                  {option.label_code_text}
                  </MenuItem>
              ))}
           </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
            label="Amount"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('crop_harvest_amount')}
            style={{width:'80vw', maxWidth:400}}
          />

          <Grid item xs={12} sm={6}>
            <TextField
              id="crop_harvest_sig"
              select
              label="Select Employee Signature"
              value={this.state.newHarvestLog.crop_harvest_sig}
              onChange={this.handleChange('crop_harvest_sig')}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(HarvestLog));