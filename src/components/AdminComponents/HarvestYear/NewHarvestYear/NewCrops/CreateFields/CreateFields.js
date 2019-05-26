
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import './CreateFields.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


class CreateFields extends Component {


  state= {
    newField: {
      name: '',
    },
    disable: true,
    disableNext: true,
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newField: {
        ...this.setState,
        [propertyName]: event.target.value,
      },
      disable: false
    });
  }

  addFieldSource = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_FIELD_SOURCE', payload: this.state.newField })
    this.setState({
      newField: {
        name: '',
      },
      disableNext: false
    })
  }

  removeFieldSource = (event) => {
    this.props.dispatch({ type: 'DELETE_FIELD_SOURCE', payload: event.currentTarget.name })

  }

  nextPage = () => {
    this.props.history.push('/labelcode')
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
              Create Fields
            </Typography>

          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Field name" variant="outlined" color="primary"
              onChange={this.handleInputChangeFor('name')}
              value={this.state.newField.name}
              style={{ width: '80vw', maxWidth: 400 }}
            >
            </TextField>

          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Button size="large" color="primary" variant="filled"
            onClick={this.addFieldSource} 
            disabled={this.state.disable} 
            >
            Add
            </Button>

          </Grid>

          <Grid item xs={12} sm={6}>
            <ul> My Fields:</ul>
              {this.props.reduxState.cropSetup.fieldSetup.map(crop =>
                <li key={crop.farm_field_id}>{crop.field_name}
                  <Button size="large" color="primary" variant="filled"
                  onClick={this.removeFieldSource} 
                  name={crop.farm_field_id} 
                  >
                  Remove
                  </Button>
                </li>
              )}

          </Grid>
    
          <Grid item xs={12} sm={6}>
            <Button size="large" color="primary" variant="filled"
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateFields)));