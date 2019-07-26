import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import swal from 'sweetalert';


class RegisterPage extends Component {
  state = {
    newUser:{
        registrationCode: '',
        person_first: '',
        person_last: '',
        username: '',
        password: '',
        email: '',
        person_status: '',
        user_role: '',
    },
    newFarm:{
      farm_name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
  },
  };
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.newUser.username && this.state.newUser.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: { newUser: this.state.newUser,
          newFarm: this.state.newFarm,
        }
      });
      // if(this.props.errors.loginMode === 'createProfile'){
      //   this.props.history.push('/createProfile')
      // }
   
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'})
    }
  } // end registerUser

  handleInputChangeForNewUser = propertyName => (event) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
      [propertyName]: event.target.value,
        person_status: true,
        user_role: 'admin',
      }
    });
  }


  handleInputChangeForNewFarm = propertyName => (event) => {
    this.setState({
      newFarm: {
        ...this.state.newFarm,
        [propertyName]: event.target.value,
      }
    });
  }




  //FUNCTION- on click of login button, dispatches 'SET_TO_LOGIN_MODE which redirects user to login view(has to do with protected route '/')
  backToLogin = () => {
    this.props.dispatch({type:'SET_TO_LOGIN_MODE'})
    this.props.history.push('/home');
  }

  render() {
    const {classes} = this.props;
    return (

      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
      Registration
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
                          onChange={this.handleInputChangeForNewUser('registrationCode')}
                          type="password"
                          value={this.state.newUser.registrationCode}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <TextField label="First Name" variant="outlined" color="primary"
                      onChange={this.handleInputChangeForNewUser('person_first')}
                      value={this.state.newUser.person_first}
                      ></TextField>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <TextField label="Last Name" variant="outlined" color="primary"
                      onChange={this.handleInputChangeForNewUser('person_last')}
                      value={this.state.newUser.person_last}
                      ></TextField>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <TextField label="Username" variant="outlined" color="primary"
                      onChange={this.handleInputChangeForNewUser('username')}
                      value={this.state.newUser.username}
                      ></TextField>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <TextField label="Password" variant="outlined" color="primary"
                      onChange={this.handleInputChangeForNewUser('password')}
                      type="password"
                      value={this.state.newUser.password}
                      ></TextField>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <TextField label="Email Address" variant="outlined" color="primary"
                      onChange={this.handleInputChangeForNewUser('email')}
                      type="email"
                      value={this.state.newUser.email}
                      ></TextField>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Farm Name" variant="outlined" color="primary"
                          onChange={this.handleInputChangeForNewFarm('farm_name')}
                          type="text"
                          value={this.state.newFarm.farm_name}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Address" variant="outlined" color="primary"
                          onChange={this.handleInputChangeForNewFarm('address')}
                          type="text"
                          value={this.state.newFarm.address}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="City" variant="outlined" color="primary"
                          onChange={this.handleInputChangeForNewFarm('city')}
                          type="text"
                          value={this.state.newFarm.city}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="State" variant="outlined" color="primary"
                          onChange={this.handleInputChangeForNewFarm('state')}
                          type="text"
                          value={this.state.newFarm.state}
                          >
                        </TextField>
                    </FormControl>
                </Grid>

                <Grid item xs={8} sm={6} >
                    <FormControl>
                        <TextField label="Zip Code" variant="outlined" color="primary"
                          onChange={this.handleInputChangeForNewFarm('zip_code')}
                          type="text"
                          value={this.state.newFarm.zip_code}
                          >
                        </TextField>
                    </FormControl>
                </Grid>
                
                <Grid item xs={8} sm={6}>
                    <Typography>{this.props.errors.registrationMessage}</Typography>
                </Grid>


                <Grid item xs={8} sm={6}>
                    <Button size="large" color="primary" onClick={this.registerUser} >Register</Button>
                    <Button size="large" color="primary" onClick={this.backToLogin} >Back To Login</Button>
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

export default connect(mapStateToProps)(RegisterPage);

