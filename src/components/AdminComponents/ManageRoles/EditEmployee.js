import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../../Nav/Nav";

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

class EditEmployee extends Component {
  // Setting up the state

  constructor(props) {
    super(props);
    this.state = {
      person_first:
        this.props.editPerson[0] && this.props.editPerson[0].person_first,
      person_last: "",
      roleSelect: "",
      person_status: "",
      selectedYear: "",
      userName: "",
      password: "",
      current_harvest_id: ""
    };
  }
  //
  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_HARVEST_YEAR" });
  };
  //
  componentDidUpdate = prevProps => {
    if (this.props.editPerson !== prevProps.editPerson) {
      this.setState({
        ...this.props.editPerson[0]
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
      workerStatus: true,
      registrationCode: 1086420
    });
  };

  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch({ type: "EDIT_PERSON", payload: this.state });

    this.props.history.push("/manageuser");
  };
  // handles on submit a new user, sends Edit person action
  handleSubmitNewUser = event => {
    event.preventDefault();

    this.props.dispatch({ type: "EDIT_PERSON_NEW_USER", payload: this.state });

    this.props.history.push("/manageuser");
  };

  // display the username and password tyo conditionaly render
  displayUsernameAndPassword = () => {
    if (this.state.roleSelect === "admin" || this.state.roleSelect === "user") {
      return (
        <Fragment>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              style={{ width: "80vw", maxWidth: 400 }}
              value={this.state.username}
              variant="outlined"
              onChange={this.handleChange("userName")}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              style={{ width: "80vw", maxWidth: 400 }}
              value={this.state.password}
              variant="outlined"
              onChange={this.handleChange("password")}
            />
          </Grid>
        </Fragment>
      );
    }
  };
  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form

  submitButton = () => {
    if (this.state.roleSelect === "admin" || this.state.roleSelect === "user") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmitNewUser}
          style={{ width: "80vw", maxWidth: 400 }}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          style={{ width: "80vw", maxWidth: 400 }}
        >
          Submit
        </Button>
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavBar />
        <Typography variant="h6" gutterBottom align="center">
          Edit Employee
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
              value={this.state.roleSelect}
              onChange={this.handleSelect("roleSelect")}
              style={{ width: "80vw", maxWidth: 400 }}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
              inputProps={{
                name: "roleSelect",
                id: "roleSelect"
              }}
            >
              <MenuItem disabled>Select User Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="selectedYear"
              name="current_harvest_id"
              select
              style={{ width: "80vw", maxWidth: 400 }}
              label="Select Harvest Year"
              className={classes.textField}
              value={this.state.current_harvest_id}
              onChange={this.handleChange("current_harvest_id")}
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              autoComplete="firstName"
              value={this.state.person_first}
              onChange={this.handleChange("person_first")}
              variant="outlined"
              style={{ width: "80vw", maxWidth: 400 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              onChange={this.handleChange("person_last")}
              value={this.state.person_last}
              variant="outlined"
              style={{ width: "80vw", maxWidth: 400 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="statusSelect"
              select
              style={{ width: "80vw", maxWidth: 400 }}
              label="Select User Status"
              className={classes.textField}
              value={this.state.person_status}
              onChange={this.handleSelect("person_status")}
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

          {this.displayUsernameAndPassword()}

          <Grid item xs={12} sm={8}>
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

export default connect(mapReduxStateToProps)(withStyles(styles)(EditEmployee));
