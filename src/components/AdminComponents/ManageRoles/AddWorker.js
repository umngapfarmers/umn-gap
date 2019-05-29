import React, { Component } from "react";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  menu: {
    width: 200
  },
  title:{
    marginTop: 25,
  }
});
class AddWorker extends Component {
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

  componentDidMount = () => {
    this.props.dispatch({ type: "FETCH_HARVEST_YEAR" });
  };

  handleError = () => {
    if (this.state.userName !== '' && this.state.password !== '' && 
    this.state.firstName !== '' && this.state.lastName !== '' && this.state.roleSelect !== '' && this.state.selectedYear !== '') {
    return (
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} onClick={this.handleSubmit}>Submit</Button>
    ) 
  }
  else {
    return(
      <Button variant="contained" color="primary" style={{width:'80vw', maxWidth:400}} disabled>Submit</Button>
    )
  }
  }

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
    console.log("in handle change", event.target.value);
  };

  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
  handleSubmit = event => {
    event.preventDefault();
    console.log("in handle submit", this.state);

    this.props.dispatch({ type: "POST_WORKER", payload: this.state });

    this.props.history.push("/manageuser");
  };

  render() {
    const { classes } = this.props;
    console.log("selected role", this.state.roleSelect);
    console.log("fetch harvest year", this.props.harvestYear);

    return (
      <React.Fragment>
        <NavBar />
        <Typography variant="h6" gutterBottom align="center" className={classes.title}>
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
                      style={{width:'80vw', maxWidth:400}}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                      inputProps={{
                        name: "roleSelect",
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
                value={this.state.selectedYear}
                onChange={this.handleChange("selectedYear")}
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
              {this.state.roleSelect !== "Employee" ? (
                <TextField
                  required
                  id="userName"
                  name="userName"
                  label="User Name"
                  disabled={false}
                  autoComplete="User Name"
                  onChange={this.handleChange("userName")}
                  value={this.state.userName}
                  variant="outlined"
                  style={{width:'80vw', maxWidth:400}}
                />
              ) : (
                <TextField
                  required
                  id="userName"
                  name="userName"
                  label="User Name"
                  disabled
                  fullWidth
                  autoComplete="User Name"
                  value=""
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {this.state.roleSelect !== "Employee" ? (
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  disabled={false}
                  style={{width:'80vw', maxWidth:400}}
                  autoComplete="Password"
                  onChange={this.handleChange("password")}
                  type="password"
                  value={this.state.password}
                  variant="outlined"
                />
              ) : (
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  disabled
                  style={{width:'80vw', maxWidth:400}}
                  autoComplete="Password"
                  value=""
                  variant="outlined"
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                style={{width:'80vw', maxWidth:400}}
                autoComplete="firstName"
                onChange={this.handleChange("firstName")}
                value={this.state.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                style={{width:'80vw', maxWidth:400}}
                autoComplete="lname"
                onChange={this.handleChange("lastName")}
                value={this.state.lastName}
                variant="outlined"
              />
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
