import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  //FUNCTION - prevents page from refreshing-- if username and password are true- dispatches login with payload of username and password otherwise throw error
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

   //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {
      const {classes} = this.props;
      return (
        <React.Fragment>
    
        <Grid container spacing={24}
         container
         direction="column"
         justify="center"
         alignItems="center"
       >
          <Grid item xs={12} sm={6}>
          {/* <Typography variant="h4" gutterBottom align="center">
        Good
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
        Agricultural
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
        Practice 
        </Typography>
        <Typography variant="h4" gutterBottom align="center">
        Farmers
        </Typography> */}
        <img src='/images/gap_logo.png' height='100%' width='100%'></img>
          </Grid>
          
                  <Grid item xs={8} sm={6} >
                      <FormControl>
                          <TextField label="Username" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('username')}
                            type="text"
                            value={this.state.username}
                            >
                          </TextField>
                      </FormControl>
                  </Grid>
  
                  <Grid item xs={8} sm={6}>
                      <TextField label="Password" variant="outlined" color="primary"
                        onChange={this.handleInputChangeFor('password')}
                        type="password"
                        value={this.state.password}
                        ></TextField>
                  </Grid>
                 
                  <Grid item xs={8} sm={6}>
                    <Typography>{this.props.errors.loginMessage}</Typography>
                  </Grid>

                  <Grid item xs={8} sm={6}>
                      <Button size="large" color="primary" onClick={this.login}>Login</Button>
                  </Grid>
                  
                  <Grid item xs={8} sm={6}>
                    <Button size="large" color="primary" onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}>Register</Button>
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
const mapReduxStateToProps = state => ({
  errors: state.errors,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(LoginPage));
