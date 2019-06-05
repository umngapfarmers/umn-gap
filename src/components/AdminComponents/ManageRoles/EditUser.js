import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../../Nav/Nav";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import swal from 'sweetalert';


// Setting up the Material UI theme

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});
class EditUser extends Component {

    // Setting up the state

  constructor(props) {
    super(props);
    this.state = {
      person_first: "",
      person_last: "",
      user_role: "",
      password: "",
      username: "",
      workerStatus: "",
      current_harvest_year: "",
      checked: false,
      changePassword: false,
    };
  }

  componentDidMount = () => {

    this.props.dispatch({ type: "FETCH_HARVEST_YEAR" });
  };

  componentDidUpdate = prevProps => {
    if (this.props.editUser !== prevProps.editUser) {

      this.setState({
        ...this.props.editUser[0]
      });
    }
  };
  // selected entry from dropdown

  handleSelect = property => event => {
    this.setState({ [property]: event.target.value });
  };
  // handles on inputs on form and sets state
  handleChange = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
      registrationCode: 122090
    });
  };
  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch({type: "EDIT_USER_PASSWORD", payload: this.state });
  
    this.props.history.push("/manageuser");
  };
  // handles on submit a new user, sends passwordless action

  handleSubmitPasswordless = event => {
    event.preventDefault();

    this.props.dispatch({type: "EDIT_USER_PASSWORDLESS", payload: this.state });
  
    this.props.history.push("/manageuser");
  };

  handleCheck = (event) => {
    event.preventDefault();
    this.setState({
        ...this.state,
        checked: event.target.checked
    })
    this.checkChangePassword()
  }
// checking the change of password
  checkChangePassword = (event) =>{
    swal({
      title: "Change Password",
      text: "Are you sure you want to change user password?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willChange) => {
      if (willChange) {
        swal("Password is now ready to be changed", {
          icon: "success",
        })
        this.setState({
          ...this.state,
          changePassword: true,

        })
      } else {
        swal("Password has not been changed");
        this.setState({
          checked: false,
        })
      }
    });
  }
// Function to display Password
  displayPassword = () =>{
    if (this.state.changePassword === true){
      return(
        <TextField
        required
        id="password"
        name="password"
        label="Password"
        style={{width:'80vw', maxWidth:400}}
        autoComplete="Password"
        onChange={this.handleChange("password")}
        type="password"
        value={this.state.password}
        variant="outlined"
        required
      />
      )
    }
    else{
      return(
        <Fragment></Fragment>
      )
    }
  }

  displayPasswordChange = () =>{
    if(this.state.checked === false){
      return (
      <FormControlLabel
      control={
        <Checkbox 
          onChange={this.handleCheck} 
          value={this.state.checked}
          checked={this.state.checked}
        />
      }
      label="Change Password"
    />
      )
    }
    else{
      return(
        <Fragment></Fragment>
      )
    }
  }
  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form

  submitButton = () =>{
    if(this.state.changePassword === true){
      return(
      <Button variant='contained' color="primary" onClick={this.handleSubmit} style={{width:'80vw', maxWidth:400}}>Submit</Button>
      )
    }
    else{
      return(
        <Button variant='contained' color="primary" onClick={this.handleSubmitPasswordless} style={{width:'80vw', maxWidth:400}}>Submit</Button>
      )
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <NavBar />
        <Typography variant="h6" gutterBottom align="center">
          Edit User
        </Typography>

          
          <Grid
            container
            spacing={24}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
                <TextField
                      select
                      label="Select User Role"
                      className={classes.textField}
                      value={this.state.user_role}
                      onChange={this.handleSelect("user_role")}
                      style={{width:'80vw', maxWidth:400}}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                      inputProps={{
                        name: "user_role",
                        id: "role-select"
                      }}
                    >
                    <MenuItem disabled>Select User Role</MenuItem>
                    <MenuItem
                        value="admin"
                      >
                        Admin
                      </MenuItem>
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
            <Grid item xs={12} sm={12}>
            <TextField
                id="selectedYear"
                name="selectedYear"
                select
                style={{ width: "80vw", maxWidth: 400 }}
                label="Select Harvest Year"
                className={classes.textField}
                value={this.state.current_harvest_year}
                onChange={this.handleChange("current_harvest_year")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                variant="outlined"
              >
                <MenuItem disabled>Select Harvest Year</MenuItem>
                {this.props.harvestYear.map(option => (
                  <MenuItem key={option.id} value={option.harvest_id}>
                    {option.harvest_year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* {this.props.reduxState.editPerson.map(row => ( */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="firstName"
                value={this.state.person_first}
                onChange={this.handleChange("person_first")}
                style={{ width: "80vw", maxWidth: 400 }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="lname"
                onChange={this.handleChange("person_last")}
                value={this.state.person_last}
                style={{ width: "80vw", maxWidth: 400 }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
              name="statusSelect"
              select
              style={{ width: "80vw", maxWidth: 400 }}
              label="Select User Status"
              className={classes.textField}
              value={this.state.user_status}
              onChange={this.handleSelect("user_status")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              variant="outlined"
              >
                <MenuItem disabled>Select User Status</MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value={true}
                >
                  Active
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value={false}
                >
                  Inactive
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
           {this.displayPasswordChange()}
          </Grid>

          <Grid item xs={12} sm={6}>
            {this.displayPassword()}
          </Grid>

            <Grid item xs={12} sm={6}>
                {this.submitButton()}
            </Grid>
          </Grid>
      </React.Fragment>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapReduxStateToProps)(withStyles(styles)(EditUser));
