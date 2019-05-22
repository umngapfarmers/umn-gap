
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateWaterSources.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router-dom';


class CreateWaterSources extends Component {


  state= {
    newWaterSource: {
      name: '',
    }
    
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newWaterSource: {
        ...this.state.newWaterSource,
        [propertyName]: event.target.value,
        
      }
    });
  }

  addWaterSource = (event) => {
    event.preventDefault();
    console.log('New water');
    this.props.dispatch({type:'ADD_WATER_SOURCE', payload: this.state.newWaterSource})
    this.setState({
      newWaterSource: {
        name: '',
      },
    })

  }
  
  removeWaterSource = (event) => {
    event.preventDefault();
    console.log('Remove water');
    this.props.dispatch({ type: 'REMOVE_WATER_SOURCE', payload: this.props.source.farm_water_source_id })
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
                    <Button size="large" color="primary" onClick={this.addWaterSource} >Add</Button>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
            <ul> Wtaer Sources:</ul>
            {
              this.props.reduxState.waterSetup.waterSetup.map(source =>
                <li key={source.farm_water_source_id}>{source.farm_water_source_name}
                  <Button size="large" color="primary"
                    onClick={this.removeWaterSource}
                    name={source.farm_water_source_id}>
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateWaterSources)));