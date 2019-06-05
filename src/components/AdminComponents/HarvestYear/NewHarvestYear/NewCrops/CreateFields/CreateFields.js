
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import './CreateFields.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';


class CreateFields extends Component {


  state= {
    newField: {
      name: '',
    },
    disable: true,
    disableNext: true,
  }

  //takes textfield input as the new value for properties within the newLabel state
  //if textfields are filled, submit button is enabled
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newField: {
        ...this.setState,
        [propertyName]: event.target.value,
      },
      disable: false
    });
  }

  //adds textfield inputs to database by calling the cropSetup saga
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

  //deletes selected field via cropSetup saga
  removeFieldSource = (event) => {
    this.props.dispatch({ type: 'DELETE_FIELD_SOURCE', payload: event.currentTarget.name })

  }
//navigates to the create label codes page for farm creation
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
            <Button size="large" color="primary" variant="contained"
            onClick={this.addFieldSource} 
            disabled={this.state.disable} 
            >
            Add
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ul>
              {this.props.reduxState.cropSetup.fieldSetup.map(crop =>
                <li key={crop.farm_field_id}>{crop.field_name}
                  <IconButton size="large" color="primary" variant="contained"
                  onClick={this.removeFieldSource} 
                  name={crop.farm_field_id} 
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateFields)));