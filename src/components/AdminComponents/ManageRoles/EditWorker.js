import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";

import EmployeeList from "./EmployeeList";
import UserList from "./UserList";
import NavBar from '../../Nav/Nav';
import TextField from '@material-ui/core/TextField';


class EditWorker extends Component {
  state = {
      roleSelect:""
  };
  // shows selected option from dropdown
    handleSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
       
    };
// function to display the list
   displayList = () => {
    if(this.state.roleSelect == 'employee'){
      return(
     <EmployeeList/>
      )
    }

    else if(this.state.roleSelect =='user'){
      return (
      <UserList/>
      )
    }

    else if(this.state.roleSelect =='admin'){
      // userToShow =  <UserList/>
    }

    else {
      return(
      <Fragment></Fragment>
      )
    }
    
   }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        
        <NavBar/>

        <Typography variant="h6" gutterBottom align="center" className={classes.title}>
          Select User Role
        </Typography>
        <Grid
          container
          spacing={24}
          direction="column"
          justify="center"
          alignItems="center"
        >
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        classes={{
                            select: classes.select
                        }}
                        value={this.state.roleSelect}
                        onChange={this.handleSelect}
                        style={{ width: '80vw', maxWidth: 400 }}
                        inputProps={{
                            name: "roleSelect",
                            id: "role-select"
                        }}
                        variant="outlined"
                    >
                      <MenuItem disabled>Select User Role</MenuItem>
                        <MenuItem
                            value="user"
                        >
                            User
                  </MenuItem>
                        <MenuItem
                            value="employee"
                        >
                            Employee
                  </MenuItem>
                    </TextField>
            </Grid>
               {this.displayList()}
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  title:{
    marginTop: 25,
  }
});

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(EditWorker));
