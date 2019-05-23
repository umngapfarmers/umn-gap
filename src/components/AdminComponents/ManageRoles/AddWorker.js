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
import NavBar from '../../Nav/Nav';

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
   
    // this.setState({
    //     newWorker:{
    //   registrationCode: "",
    //   userName: "",
    //   password: "",
    //   firstName: "",
    //   lastName: "",
    //   roleSelect: "",
    //   workerStatus: ""
    //     }
    // });
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    console.log("selected role", this.state.roleSelect);
    console.log("fetch harvest year", this.props.harvestYear);

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
                  style={{ width: '60vw', maxWidth: 400 }}

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
            <Grid item xs={12} sm={12}>
              <TextField
                id="selectedYear"
                name="selectedYear"
                select
                style={{width:'80vw',maxWidth:400}}
                label="* Select harvest Year"
                className={classes.textField}
                value={this.state.selectedYear}
                onChange={this.handleChange("selectedYear")}
                
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                // validators={["required"]}
                // errorMessages={["this field is required"]}
                // margin="normal"
                // variant="outlined"
              >
                {this.props.harvestYear.map(option => (
                  <MenuItem key={option.id} value={option.harvest_id}>
                  {option.harvest_year}</MenuItem>
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
                  fullWidth
                  autoComplete="User Name"
                  onChange={this.handleChange("userName")}
                  value={this.state.userName}
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
                  fullWidth
                  autoComplete="Password"
                  onChange={this.handleChange("password")}
                  type="password"
                  value={this.state.password}
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
                  value=""
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
                autoComplete="firstName"
                onChange={this.handleChange("firstName")}
                value={this.state.firstName}
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
                onChange={this.handleChange("lastName")}
                value={this.state.lastName}
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

const mapReduxStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapReduxStateToProps)(withStyles(styles)(AddWorker));
