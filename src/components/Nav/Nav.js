import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LogoutButton from '../LogOutButton/LogOutButton';
import HomeIcon from '@material-ui/icons/Home'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MenuAppBar extends React.Component {
    state = {
      auth: true,
      anchorEl: null,
    };
  
    handleChange = event => {
      this.setState({ auth: event.target.checked });
    };
  
    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    conditionallyRenderMenuItems = () => {
        if(this.props.reduxState.user.user_role == 'admin'){
            return(
            <Fragment>
            <MenuItem onClick={() => {this.props.history.push('/')}}>
            <FontAwesomeIcon icon="home"  style={{color: '#7690B8',
            marginRight: 5}}/>
                <Typography>Home </Typography>
            </MenuItem>

            <MenuItem onClick={() => {this.props.history.push('/logdashboard')}}>
                <FontAwesomeIcon icon="clipboard"  style={{color: '#7690B8',
            marginRight: 5}}/>
                <Typography>Create Logs </Typography>
            </MenuItem>

            <MenuItem onClick={() => {this.props.history.push('/manageuser')}}>
                <FontAwesomeIcon icon="users"  style={{color: '#7690B8',
            marginRight: 5}}/>
                <Typography>Manage Roles </Typography>
            </MenuItem>

            <MenuItem onClick={() => {this.props.history.push('/recorddashboard')}}>
                <FontAwesomeIcon icon="table"  style={{color: '#7690B8',
            marginRight: 5}}/>
                <Typography>View Records </Typography>
            </MenuItem>

            <MenuItem onClick={() => {this.props.history.push('/harvestdashboard')}}>
                <FontAwesomeIcon icon="tractor" style={{color: '#7690B8',
            marginRight: 5}}/>
                <Typography>Manage Harvest Year </Typography>
            </MenuItem>
            </Fragment>
            )
        }
        if(this.props.reduxState.user.user_role == 'worker'){
            return(
                <Fragment>
                <MenuItem onClick={() => {this.props.history.push('/')}}>
                <FontAwesomeIcon icon="home"  style={{color: '#7690B8',
                marginRight: 5}}/>
                    <Typography>Home </Typography>
                </MenuItem>
    
                <MenuItem onClick={() => {this.props.history.push('/logdashboard')}}>
                    <FontAwesomeIcon icon="clipboard"  style={{color: '#7690B8',
                marginRight: 5}}/>
                    <Typography>Create Logs </Typography>
                </MenuItem>


                <MenuItem onClick={() => {this.props.history.push('/recorddashboard')}}>
                    <FontAwesomeIcon icon="table"  style={{color: '#7690B8',
                marginRight: 5}}/>
                    <Typography>View Records </Typography>
                </MenuItem>
                </Fragment>
                )

        }
        

    }
  
    render() {
      const { classes } = this.props;
      const { auth, anchorEl } = this.state;
      const open = Boolean(anchorEl);
  
      return (
        <div className={classes.root}>
          <AppBar position="static" className={classes.appbar}>
            <Toolbar>
            {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                   {this.conditionallyRenderMenuItems()}

                  </Menu>
                </div>
              )}
              <Typography variant="h6" color="inherit" className={classes.grow}>
                
              </Typography>
              <LogoutButton/>
              <FontAwesomeIcon icon="sign-out-alt"  style={{color: '#white',
                marginRight: 5}}/>  
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
  
  MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    fabIconColor:{
        color: '#7690B8',
        marginRight: 5,
      },
      appbar:{
          backgroundColor: '#676B36',
      },
  };

  const mapReduxStateToProps = (reduxState) => ({
    reduxState,
  });
  export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(MenuAppBar)));