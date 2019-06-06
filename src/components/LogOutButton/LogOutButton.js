import React , { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class LogoutButton extends Component {

  //FUNCTION- dispatches logout which logouts user and navigates user to login page
  handleLogout = () => {
   this.props.dispatch({ type: 'LOGOUT' });
   this.props.history.push('/');
  }


render() {

  return (
    
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      onClick={this.handleLogout}
      style={{color: 'white'}}
    >
    
      Log Out
    </Button>
  
  );
}
}

const mapReduxStateToProps = (reduxState) => ({
reduxState,
});

export default withRouter(connect( mapReduxStateToProps )(LogoutButton));