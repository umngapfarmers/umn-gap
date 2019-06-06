
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateCrops.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';


class CreateCrops extends Component {


  state= {
    newCrop: {
      type:'',
    },
    disable: true,
    disableNext: true
    
  }
  //takes textfield input as the new value for properties within the newLabel state
  //if textfields are filled, submit button is enabled
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newCrop: {
        ...this.setState,
        [propertyName]: event.target.value,
      },
      disable: false
    });
  }

  //adds textfield inputs to database by calling the cropSetup saga
  addCropSource = (event) => {
    event.preventDefault();
    this.props.dispatch({type:'ADD_CROP_SOURCE', payload: this.state.newCrop});
    this.setState({
      newCrop: {
        type:'',
      },
      disableNext: false
    })
  }

  //deletes selected crop via cropSetup saga
  removeCropSource = (event) => {
    this.props.dispatch({ type: 'DELETE_CROP_SOURCE', payload: event.currentTarget.name });
  }

  //navigates to the add field page for farm creation
  nextPage = () => {
    this.props.history.push('/field');
  }


  render() {
    
    const {classes} = this.props;
    return (
      <React.Fragment>
            
        <Grid container spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center">
          
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              List all crops you want to track
            </Typography>
          </Grid>
               
          <Grid item xs={12} sm={6}>
            <TextField label="Crops to track" variant="outlined" color="primary"
              onChange={this.handleInputChangeFor('type')}
              value={this.state.newCrop.type}
              style={{ width: '80vw', maxWidth: 400 }}
            >
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button size="large" color="primary" variant="contained"
            onClick={this.addCropSource} 
            disabled={this.state.disable}
            >
            Add
            </Button> 
          </Grid>
          
          <Grid item xs={12} sm={6}>
          <ul> 
              {this.props.reduxState.cropSetup.cropSetup.map(crop =>
                <li key={crop.farm_crop_id} value={crop.farm_crop_id}>{crop.farm_crop_type}
                  <IconButton size="small" color="primary" variant="contained"
                  onClick={this.removeCropSource} 
                  name={crop.farm_crop_id}
                  >
                  <FontAwesomeIcon icon='minus-circle'/>
                  </IconButton>
                </li> 
              )}
          </ul>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button size="large" color="primary" variant="contained"
            onClick={this.nextPage} 
            disabled={this.state.disableNext}
            > 
            Next 
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateCrops)));