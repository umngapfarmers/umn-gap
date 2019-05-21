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
import NavBar from "../NavBar/NavBar";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit
    // marginRight: theme.spacing.unit,
    //width: 200,
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});
class AddWorker extends Component {
  state = {
    UserName: "",
    Password: "",
    FirstName: "",
    LastName: "",
    roleSelect: ""
  };
  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    //let roleSelect = event.target.value;
    //console.log('selected role',this.state.roleSelect)
  };
  // handles on inputs on form and sets state
  handleChange = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
    console.log("in handle change", event.target.value);
  };

  // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
  handleSubmit = event => {
    event.preventDefault();
    console.log("in handle submit", this.state);

    this.props.dispatch({ type: "POST_WORKER", payload: this.state });
    this.setState({
      UserName: "",
      Password: "",
      FirstName: "",
      LastName: "",
      roleSelect: ""
    });
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    console.log("selected role", this.state.roleSelect);

    return (
      <React.Fragment>
        <NavBar />
        <Typography variant="h6" gutterBottom>
          Registration
        </Typography>
        <FormControl
          ref="form"
          //justify="center"
          //alignItems="center"
          fullWidth
          className={classes.selectFormControl}
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid
            container
            spacing={24}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <label>Select Role</label>
              <FormControl fullWidth className={classes.selectFormControl}>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.roleSelect}
                  onChange={this.handleSelect}
                  inputProps={{
                    name: "roleSelect",
                    id: "role-select"
                  }}
                >
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="Admin"
                  >
                    Admin
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="Worker"
                  >
                    Worker
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="Employee"
                  >
                    Employee
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              {this.state.roleSelect !== "Employee" ? (
                <TextField
                  required
                  id="uName"
                  name="uName"
                  label="User Name"
                  disabled={false}
                  fullWidth
                  autoComplete="User Name"
                />
              ) : (
                <TextField
                  required
                  id="uName"
                  name="uName"
                  label="User Name"
                  disabled
                  fullWidth
                  autoComplete="User Name"
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
                  fullWidth
                  autoComplete="Password"
                />
              ) : (
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  disabled
                  fullWidth
                  autoComplete="Password"
                />
              )}
            </Grid>
            <Grid item xs={8} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                //fullWidth
                autoComplete="fname"
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
              />
            </Grid>
            <Grid item xs={8} sm={6}>
              <FormControl>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </FormControl>
            </Grid>
          </Grid>
        </FormControl>
      </React.Fragment>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(AddWorker));
