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
import NavBar from "../../Nav/Nav";

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
  constructor(props) {
    super(props);
    this.state = {
      person_first:
        this.props.editPerson[0] && this.props.editPerson[0].person_first,
      person_last: "",
      roleSelect: "",
      workerStatus: "",
      selectedYear: ""
    };
  }

  componentDidMount = () => {
    console.log("in component did mount edit employee", this.props.editPerson);

    this.props.dispatch({ type: "FETCH_HARVEST_YEAR" });
  };

  componentDidUpdate = prevProps => {
    if (this.props.editPerson !== prevProps.editPerson) {
      console.log(`componentDidUpdate `, this.props.editPerson[0]);

      this.setState({
        ...this.props.editPerson[0]
      });
    }
  };

  handleSelect = property => event => {
    this.setState({ [property]: event.target.value });
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

    this.props.dispatch({ type: "EDIT_PERSON", payload: this.state });

    this.props.history.push("/");
  };

  displayPassword = () =>{
    if (this.state.roleSelect === 'admin' || this.state.roleSelect === 'user'){
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
      />
      )
    }
    else{
      return(
        <Fragment></Fragment>
      )
    }
  }

  displayUsername = () =>{
    if (this.state.roleSelect === 'admin' || this.state.roleSelect === 'user'){
      return(
        <TextField
        required
        id="userName"
        name="userName"
        label="User Name"
        style={{width:'80vw', maxWidth:400}}
        autoComplete="User Name"
        onChange={this.handleChange("userName")}
        value={this.state.userName}
        variant="outlined"
      />
      )
    }
    else{
      return(
        <Fragment></Fragment>
      )
    }
  }


  render() {
    const { classes } = this.props;
    console.log("selected role", this.props.editPerson);
    console.log("fetch harvest year", this.props.harvestYear);
    console.log("state ", this.state);
    console.log('selectedRole', this.state.roleSelect);

    return (
      <React.Fragment>
        <NavBar />
        <Typography variant="h6" gutterBottom align="center">
          Edit Employee
        </Typography>

        <FormControl
          ref="form"
          fullWidth
          className={classes.selectFormControl}
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
          {/* {JSON.stringify(this.props.editPerson)}
          {JSON.stringify(this.state.editPerson)}
          {JSON.stringify(this.props.reduxState)} */}
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
            {/* {this.props.reduxState.editPerson.map(row => ( */}
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
            {this.state.person_status === true ? (
              <Select
                MenuProps={{
                  // className: classes.selectMenu
                  className: classes.selectMenuItemSelected
                }}
                classes={{
                  select: classes.select
                }}
                value={this.state.person_status}
                onChange={this.handleSelect("person_status")}
                style={{ width: "60vw", maxWidth: 400 }}
                inputProps={{
                  name: "statusSelect",
                  id: "status-select"
                }}
              >
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
              </Select>
            ) : (
              <Select
                MenuProps={{
                  // className: classes.selectMenu
                  className: classes.selectMenuItemSelected
                }}
                classes={{
                  select: classes.select
                }}
                value="Inactive"
                onChange={this.handleSelect("person_status")}
                style={{ width: "60vw", maxWidth: 400 }}
                inputProps={{
                  name: "statusSelect",
                  id: "status-select"
                }}
              >
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Active"
                >
                  Active
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Inactive"
                >
                  Inactive
                </MenuItem>
              </Select>
            )}

            <Grid item xs={12} sm={6}>
             {this.displayUsername()}
            </Grid>

            <Grid item xs={12} sm={6}>
             {this.displayPassword()}
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

export default connect(mapReduxStateToProps)(withStyles(styles)(EditEmployee));
