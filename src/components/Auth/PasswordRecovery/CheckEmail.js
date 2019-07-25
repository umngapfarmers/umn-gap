import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


class CheckEmail extends Component {

    checkEmail = () => {
        this.props.dispatch({type:'SET_TO_LOGIN_MODE'});
        this.props.dispatch({type:'CLEAR_LOGIN_ERROR'});
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
                <Typography variant='h6'>An email has been sent to the email address provided.</Typography>
           </Grid>
                
                  <Grid item xs={8} sm={6}>
                    <Button size="large" color="primary" onClick={this.checkEmail}>Return To Login</Button>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(CheckEmail));
