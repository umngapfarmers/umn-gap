import React, { Component } from "react";
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


class EditWorker extends Component {
  state = {
      roleSelect:""
  };
    handleSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
       
    };
  render() {
    const { classes } = this.props;
      console.log('role selected is', this.state.roleSelect)
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom align="center">
          Choose a User Type to Edit
        </Typography>
        <Grid
          container
          spacing={24}
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
                            value="Workers"
                        >
                            Workers
                  </MenuItem>
                        <MenuItem
                            classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                            }}
                            value="Employees"
                        >
                            Employees
                  </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
                {this.state.roleSelect == "Employees" ?(
                    <EmployeeList/>
                ):(
                    <UserList/>
                )}
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(EditWorker));
