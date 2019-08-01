import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

const moment = require('moment');

// Allows farmer to create a new equipment
// Accessed as part of intial farm set up workflow and through harvest year edit
// access at /newOtherEquipment
class CreateCompost extends Component {

  state = {
    farm_equipment_other_name: ''
  }

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    })
  }

  validateFilled = () => {
    if (this.state.farm_equipment_other_name) {
      return false
    } else {

      return true
    }
  }

  onSubmit = () => {
    this.props.dispatch({
      type: 'ADD_OTHER_EQUIPMENT',
      payload: {
        ...this.state
      }
    });

    this.setState({
      farm_equipment_other_name: ''
    })
  }
  
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
          Create New Equipment of Type "Other"
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
                    label="Equipment Name" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('farm_equipment_other_name')}
                    value={this.state.farm_equipment_other_name}
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
              Add New Equipment
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

export default connect(mapReduxStateToProps)(withStyles(styles)(CreateCompost));