import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import swal from 'sweetalert';


class SetupFarm extends Component {
  state = {
    newFarm:{
        farm_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        registrationCode: '',
    },
  };

  //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newFarm: {
        ...this.state.newFarm,
        [propertyName]: event.target.value,
      }
    });
  }

  //FUNCTION - on click of submit button- prevents refresh of page-- dispatches payload of state to database to create new farm, sets user to login mode
  // navigates user to admin dashboard
  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_FARM', payload: this.state.newFarm});
    this.props.dispatch({type: 'SET_TO_LOGIN_MODE'});
    this.props.history.push('/');
  }
  


  render() {
    const {classes} = this.props;
    return (

      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
        Register Farm Information
      </Typography>
      <Grid container spacing={24}
       container
       direction="column"
       justify="center"
       alignItems="center"
     >
              <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Registration Code" variant="outlined" color="primary"
                          onChange={this.handleInputChangeFor('registrationCode')}
                          type="password"
                          value={this.state.newFarm.registrationCode}
                          >
                        </TextField>
                    </FormControl>
                </Grid>
        
                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Farm Name" variant="outlined" color="primary"
                          onChange={this.handleInputChangeFor('farm_name')}
                          type="text"
                          value={this.state.newFarm.farm_name}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Address" variant="outlined" color="primary"
                          onChange={this.handleInputChangeFor('address')}
                          type="text"
                          value={this.state.newFarm.address}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="City" variant="outlined" color="primary"
                          onChange={this.handleInputChangeFor('city')}
                          type="text"
                          value={this.state.newFarm.city}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="State" variant="outlined" color="primary"
                          onChange={this.handleInputChangeFor('state')}
                          type="text"
                          value={this.state.newFarm.state}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Zip Code" variant="outlined" color="primary"
                          onChange={this.handleInputChangeFor('zip_code')}
                          type="text"
                          value={this.state.newFarm.zip_code}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </FormControl>
                </Grid>

                
               
            </Grid>
            {/* <h2
                className="alert"
                role="alert"
              >
                {this.props.errors.registrationMessage}
          </h2> */}

            
        </React.Fragment>
    );
  }
}



const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  textField: {
      marginLeft: theme.spacing.unit,
     // marginRight: theme.spacing.unit,
      //width: 200,
  },
  dense: {
      marginTop: 19,
  },
  menu: {
      width: 200,
  },
});


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(SetupFarm);

