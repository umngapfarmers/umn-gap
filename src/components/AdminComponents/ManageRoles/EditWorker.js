import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmployeeList from "./EmployeeList";
import UserList from "./UserList";
import NavBar from '../../Nav/Nav';
import TextField from '@material-ui/core/TextField';


class EditWorker extends Component {
  state = {
      roleSelect:""
  };
    handleSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
       
    };

   displayList = () => {
    if(this.state.roleSelect == 'employee'){
      return(
     <EmployeeList/>
      )
    }

    else if(this.state.roleSelect =='user'){
      console.log('in user')
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
    console.log('role selected is', this.state.roleSelect)

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
