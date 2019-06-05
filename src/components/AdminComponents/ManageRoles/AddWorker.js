import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import NavBar from "../../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Setting up the Material UI theme
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  menu: {
    width: 200
  },
  title: {
    marginTop: 25
  }
});
class AddWorker extends Component {
  // Setting up the state
  state = {
    registrationCode: "",
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    roleSelect: "",
    workerStatus: "",
    selectedYear: ""
  };
  // Fetching harvest years from DB to fill the drop down
  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_HARVEST_YEAR" });
  };
  // Control validation
  handleError = () => {
    if (
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.roleSelect !== "" &&
      this.state.selectedYear !== ""
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ width: "80vw", maxWidth: 400 }}
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          style={{ width: "80vw", maxWidth: 400 }}
          disabled
        >
          Submit
        </Button>
      );
    }
  };
  // selected entry from dropdown
  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // handles on inputs on form and sets state
  handleChange = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
      workerStatus: true,
      registrationCode: 122090
    });
  };

  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch({ type: "POST_WORKER", payload: this.state });

    this.props.history.push("/manageuser");
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavBar />
        <Typography
          variant="h6"
          gutterBottom
          align="center"
          className={classes.title}
        >
          Add Worker
        </Typography>
        <Grid
          container
          spacing={16}
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
              onChange={this.handleSelect}
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
                id: "role-select"
              }}
              helperText="Required"
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
              name="selectedYear"
              select
              style={{ width: "80vw", maxWidth: 400 }}
              label="Select Harvest Year"
              className={classes.textField}
              value={this.state.selectedYear}
              onChange={this.handleChange("selectedYear")}
              helperText="Required"
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              variant="outlined"
            >
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
              label="First Name"
              style={{ width: "80vw", maxWidth: 400 }}
              autoComplete="firstName"
              onChange={this.handleChange("firstName")}
              value={this.state.firstName}
              variant="outlined"
              helperText="Required"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              style={{ width: "80vw", maxWidth: 400 }}
              autoComplete="lname"
              onChange={this.handleChange("lastName")}
              value={this.state.lastName}
              variant="outlined"
              helperText="Required"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {this.state.roleSelect == "admin" ||
            this.state.roleSelect == "user" ? (
              <TextField
                required
                id="userName"
                name="userName"
                label="Username"
                autoComplete="User Name"
                value={this.state.userName}
                style={{ width: "80vw", maxWidth: 400 }}
                variant="outlined"
                onChange={this.handleChange("userName")}
                helperText="Required"
              />
            ) : (
              <Fragment />
            )}
          </Grid>
          {/* Conditionally render to show password field only if the role is user or admin */}
          <Grid item xs={12} sm={6}>
            {this.state.roleSelect == "admin" ||
            this.state.roleSelect == "user" ? (
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                style={{ width: "80vw", maxWidth: 400 }}
                autoComplete="Password"
                value={this.state.password}
                variant="outlined"
                onChange={this.handleChange("password")}
                type="password"
                helperText="Required"
              />
            ) : (
              <Fragment />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {this.handleError()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapReduxStateToProps)(withStyles(styles)(AddWorker));
