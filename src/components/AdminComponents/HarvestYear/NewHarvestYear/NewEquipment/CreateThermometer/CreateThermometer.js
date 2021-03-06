import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


// Allows farmer to create a new equipment
// Accessed as part of intial farm set up workflow and through harvest year edit
// access at "/newThermometer"
class CreateThermometer extends Component {

  state = {
    farm_thermometer_location: ''
  };

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  };

  validateFilled = () => {
    if (this.state.farm_thermometer_location) {
      return false
    } else {

      return true
    };
  };

  onSubmit = () => {
    this.props.dispatch({
      type: 'ADD_THERMOMETER',
      payload: {
        ...this.state
      }
    });
    this.setState({
      farm_thermometer_location: ''
    });
  };

  handleRemove = (id) => {
    this.props.dispatch({
      type: 'DELETE_THERMOMETER',
      payload: {
        id,
      }
    });
  };

  componentDidMount(){
    this.props.dispatch({type: 'GET_THERMOMETER'});
  };
  
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
          Create New Thermometer
      </Typography>
      <Grid 
        container 
        spacing={24}
        direction = "column"
        justify = "center"
        alignItems = "center"
      >
        <Grid item xs={10} sm={6} >
            <FormControl>
                <TextField 
                    label="Thermometer Name" 
                    variant="outlined" 
                    color="primary"
                    onChange = {
                      this.handleChangeFor('farm_thermometer_location')
                    }
                    value = {
                      this.state.farm_thermometer_location
                    }
                    style={{width:'80vw', maxWidth:400}}
                  >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} >
          <Button 
            disabled={this.validateFilled()} 
            size="large" color="primary" 
            variant="contained" 
            onClick={this.onSubmit} 
            style={{width:'80vw', maxWidth:400}}>
              Add New Thermometer
            </Button>
        </Grid>
        
         <Grid item xs={10} sm={6} >
           <Button  
              size="large" 
              color="primary" 
              variant="contained" 
              onClick={()=>this.props.history.push('/newequipment')} 
              style={{width:'80vw', maxWidth:400}}>
                Back to Equipment
            </Button>
        </Grid>

        <Grid item xs={10} sm={6} >
          <ul>
            {/* checks if redux state is filled */}
            {
              this.props.reduxState.equipmentReducer.thermometer[0] && this.props.reduxState.equipmentReducer.thermometer.map(equipment =>
              <li key={equipment.farm_thermometer_id}>{equipment.farm_thermometer_location}
                <IconButton size="large" color="primary" variant='contained' onClick={() => this.handleRemove(equipment.farm_thermometer_id)}><FontAwesomeIcon icon='minus-circle'/></IconButton>
              </li>
            )}
          </ul>
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

export default connect(mapReduxStateToProps)(withStyles(styles)(CreateThermometer));