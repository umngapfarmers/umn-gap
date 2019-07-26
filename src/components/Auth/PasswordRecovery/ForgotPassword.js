import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class ForgotPassword extends Component {
  state = {
    email: '',
  };


  handleSubmit = event => {
      if(this.state.email) {
      this.props.dispatch({type: 'CHECK_EMAIL', payload: this.state.email});
      }
      else{
          this.props.dispatch({type:'CHECK_EMAIL_ERROR'})
      }
  }




   //FUNCTION- handles change of text fields-- sets state to user inputed values 
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }


  render() {
      const {classes} = this.props;
      console.log(this.state);
      return (
        <React.Fragment>
    
            <Grid container spacing={24}
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.gridMargin}
            >

                  <Grid item xs={8} sm={6}>
                    <Typography variant='h6' className={classes.title}>Forgot Password</Typography>
                  </Grid>

                <Grid item xs={8} sm={6}>
                    <Typography>Please enter the email associated with your account. 
                    <br/>Once submitted you will receive an email with instructions to reset your password.</Typography>
                </Grid>

            
                <Grid item xs={12} >
                    <FormControl>
                        <TextField label="Email Address" variant="outlined" color="primary"
                        onChange={this.handleInputChangeFor('email')}
                        type="text"
                        value={this.state.email}
                        style={{width:'80vw', maxWidth:400}}
                        >
                        </TextField>
                    </FormControl>
                </Grid>

                    
                <Grid item xs={12}>
                    <Button size="large" color="primary" onClick={this.handleSubmit}>Submit</Button>
                </Grid>

                <Grid item xs={8} sm={6}>
                    <Typography>{this.props.errors.loginMessage}</Typography>
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
  gridMargin: {
    marginTop: 25,
  },
  title: {
    marginBottom: 10,
  }
});


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapReduxStateToProps = state => ({
  errors: state.errors,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ForgotPassword));
