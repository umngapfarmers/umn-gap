import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import qs from 'query-string';
import moment from 'moment';
class ChangePassword extends Component {
  state = {
    token: '',
    expirationTime: '',
    password1: '',
    password2: '',
  };

  componentDidMount(){
      const query = qs.parse(this.props.location.search);
      const passwordToken = query.token;
      const tokenTime = moment(query.time).format();
      console.log('Token is:', passwordToken);
      console.log('Expiration time is:', tokenTime);
      this.setState({
          token: passwordToken,
          requestedTime: tokenTime,
      })
  }

  checkTimeToken = (event) => {
    console.log('Current time is:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    console.log('Requested time is:', this.state.requestedTime);
    const additionTime = moment(this.state.requestedTime).add(10, 'minutes');
    console.log('AdditionTime Time Is:', additionTime);
    const expirationTime = additionTime._d
    console.log('Expiration time is:', expirationTime);
    // const dayAhead = moment().add(10, 'minutes');
    // console.log('DayAhead is:', dayAhead);
    event.preventDefault();
    if(moment(moment()).isBetween(this.state.requestedTime, expirationTime)){
      console.log('Between Time');
      this.handleSubmit();
    }
    else{
      console.log('is after');
      alert(`Sorry it has been to long since you requested to change your password. Please request to change your password again.`)
    }
  }


  handleSubmit = () => {
      if(this.state.password1 === this.state.password2){
      this.props.dispatch({type: 'UPDATE_PASSWORD', payload: this.state});
      this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})
      this.props.history.push('/');
      }
      else{
          alert(`Passwords did not match. Try again!`)
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
      console.log('State is', this.state);
      return (
        <React.Fragment>
    
        <Grid container spacing={24}
         container
         direction="column"
         justify="center"
         alignItems="center"
         className={classes.gridMargin}
       >
        
                  <Grid item xs={8} sm={6} >
                      <FormControl>
                          <TextField label="New Password" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('password1')}
                            type="password"
                            value={this.state.password1}
                            >
                          </TextField>
                      </FormControl>
                  </Grid>

                  <Grid item xs={8} sm={6} >
                      <FormControl>
                          <TextField label="Enter New Password Again" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('password2')}
                            type="password"
                            value={this.state.password2}
                            >
                          </TextField>
                      </FormControl>
                  </Grid>
                
                  <Grid item xs={8} sm={6}>
                    <Button size="large" color="primary" onClick={this.checkTimeToken}>Reset Password</Button>
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
  }
});


// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapReduxStateToProps = state => ({
  errors: state.errors,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ChangePassword));
