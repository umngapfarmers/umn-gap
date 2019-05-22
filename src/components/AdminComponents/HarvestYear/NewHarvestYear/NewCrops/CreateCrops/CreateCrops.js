
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateCrops.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


class CreateCrops extends Component {


  state= {
    newCrop: {
      type:'',
      harvest_year_id: this.props.reduxState.user.current_harvest_year,
    }
    
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newCrop: {
        ...this.setState,
        [propertyName]: event.target.value,

      }
    });
  }

  addCropSource = (event) => {
    event.preventDefault();
    this.props.dispatch({type:'ADD_CROP_SOURCE', payload: this.state.newCrop})
    this.setState({
      newCrop: {
        type:'',
      }
    })
  }

  removeCropSource = (event) => {
    this.props.dispatch({ type: 'DELETE_CROP_SOURCE', payload: event.currentTarget.name })
    console.log('id is', event.currentTarget.name);
  }

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
            >
            </TextField>
            <Button size="large" color="primary" onClick={this.addCropSource} >Add</Button>
                   
                </Grid>
          
          <Grid item xs={12} sm={6}>
          <ul> My Crops:</ul>
            {
              this.props.reduxState.cropSetup.cropSetup.map(crop =>
                <li key={crop.farm_crop_id} value={crop.farm_crop_id}>{crop.farm_crop_type}
                  <Button size="large" color="primary" onClick={this.removeCropSource} name={crop.farm_crop_id}>
                Remove
                </Button>
                </li> 
              )
            }

          </Grid>
          <Grid item xs={12} sm={6}>
            <Button size="large" color="primary" onClick={this.nextPage}>Next</Button>

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