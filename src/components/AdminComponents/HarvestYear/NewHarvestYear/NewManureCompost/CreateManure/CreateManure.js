import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import './CreateManure.css';
const moment = require('moment');

// Allows farmer to create a manure source.
// Accessed as part of intial farm set up workflow and through harvest year edit
class CreateManure extends Component {


  state= {
    farm_manure_date: '',
    farm_manure_description: '',
    farm_manure_rate: '',
    label_code_id: '',
    harvest_year_id: this.props.reduxState.user.current_harvest_year,
    farm_manure_status: true
  }

  handleChangeFor = property => event => {
    this.setState({
        ...this.state,
        [property]: event.target.value
    })
  }

  componentDidMount(){
    this.props.dispatch({type: 'GET_LABEL_CODE', payload:{harvest_year_id: this.props.reduxState.user.current_harvest_year}})
    this.props.dispatch({type:'GET_MANURE_SOURCE'}) 
  }

  onSubmitManure = () => {
    this.props.dispatch({type: 'ADD_MANURE_SOURCE', payload:{...this.state}});
    this.setState({
      farm_manure_date: '',
      farm_manure_description: '',
      farm_manure_rate: '',
      label_code_id: '',
      harvest_year_id: this.props.reduxState.user.current_harvest_year,
      farm_manure_status: true
    })
  }
  
  handleRemove = (id) => {
    this.props.dispatch({type: 'DELETE_MANURE_SOURCE', payload:{id,}})
  }

  handleNext = () => {
    
  }
  
  render() {
    // console.log(`state in createManure form `, this.state);
    
    const {classes} = this.props;
    console.log(this.props.reduxState.user);
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
          Create New Manure Source
      </Typography>
      <Grid 
        container 
        spacing={24}
        direction = "column"
        justify = "center"
        alignItems = "center"
      >
        <Grid item xs={8} sm={6} >
            <FormControl>
                <TextField 
                    label="Application Date" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('farm_manure_date')}
                    type="date"
                    value={this.state.farm_manure_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={8} sm={6} >
            <FormControl>
                <TextField 
                    label="Describe Manure" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('farm_manure_description')}
                    value={this.state.farm_manure_description}
                    multiline
                  >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={8} sm={6} >
            <FormControl>
                <TextField 
                  label="Application Rate" 
                  variant="outlined" 
                  color="primary"
                  onChange={this.handleChangeFor('farm_manure_rate')}
                  value={this.state.farm_manure_rate}
                >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={8} sm={6} >
            <FormControl>
                <TextField 
                  label="Label Code" 
                  variant="outlined" 
                  color="primary"
                  onChange={this.handleChangeFor('label_code_id')}
                  value={this.state.label_code_id}
                  select
                >
                  {this.props.reduxState.labelCode.map( code => (
                    <MenuItem key={code.label_code_id} value={code.label_code_id}>
                      {code.label_code_text}
                    </MenuItem>
                  ))}
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={8} sm={6} >
          <Button size="large" color="primary" onClick={this.onSubmitManure}>Add New Manure Source</Button>
        </Grid>
 
        <Grid item xs={8} sm={6} >
          <ul>
            {this.props.reduxState.setupManure.map(manure =>
              <li key={manure.farm_manure_id}>{manure.label_code_text+' '+ moment(manure.farm_manure_date).format('YYYY-MM-DD')}
                <Button size="large" color="primary" onClick={() => this.handleRemove(manure.farm_manure_id)}>Remove</Button>
              </li>
            )}
          </ul>
        </Grid>  

        <Grid item xs={8} sm={6} >
          <Button size="large" color="primary" onClick={this.handleNext}>Next</Button>

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

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateManure));