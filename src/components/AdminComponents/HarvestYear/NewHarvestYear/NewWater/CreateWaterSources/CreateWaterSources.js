
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateWaterSources.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

// Allows farmer to create a water source.
// Accessed as part of intial farm set up workflow and through harvest year edit
class CreateWaterSources extends Component {


  state= {
    newWaterSource: {
      name: '',
    },
    disable: true,
    disableNext: true
    
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newWaterSource: {
        ...this.state.newWaterSource,
        [propertyName]: event.target.value,
      },
      disable: false
    });
  }

  addWaterSource = (event) => {
    event.preventDefault();
    this.props.dispatch({type:'ADD_WATER_SOURCE', payload: this.state.newWaterSource})
    this.setState({
      newWaterSource: {
        name: '',
      },
      disableNext: false
    })

  }
  
  removeWaterSource = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'DELETE_WATER_SOURCE', payload: event.currentTarget.name })
  }

  nextPage = () => {
    this.props.history.push('/waterLabel')
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
              Create Water Sources
            </Typography>
          </Grid>
               
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField label="Water Sources" variant="outlined" color="primary"
                onChange={this.handleInputChangeFor('name')}
                value={this.state.newWaterSource.name}
                style={{ width: '80vw', maxWidth: 400 }}
              >
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button size="large" color="primary" variant="contained"
              onClick={this.addWaterSource} 
              disabled={this.state.disable}
            >
            Add
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ul> 
            {this.props.reduxState.waterSetup.waterSource.map(source =>
                <li key={source.farm_water_source_id}>{source.farm_water_source_name}
                  <IconButton size="small" color="primary" variant="contained"
                    onClick={this.removeWaterSource}
                    name={source.farm_water_source_id}
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateWaterSources)));