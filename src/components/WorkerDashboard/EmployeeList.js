import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import RegisterPage from "../Auth/RegisterPage/RegisterPage";

class EmployeeList extends Component {
  state = {
      person_id:""
  };

  componentDidMount = () => {
    this.props.dispatch({ type: "GET_PERSON" });
  };
    handleEdit = person_id => () => {
        console.log("edit click for id", person_id);
        this.setState({
            open: true,
            selectedId: person_id
        });
       // this.props.history.push(`/editemployee/?id=${person_id}`);
        this.props.dispatch({
            type: "GET_PERSON_TO_EDIT",
            payload: person_id
        });
        this.props.history.push(`/editemployee`)
    };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom align="center">
          Edit Employee
        </Typography>
        <Grid
          container
          spacing={24}
          direction="column"
          justify="left"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <List component="nav">
              {this.props.reduxState.person[0] &&
                this.props.reduxState.person.map(Person => (
                  <ListItem
                    key={Person.person_id}
                    button
                    selected={this.state.selectedIndex === 0}
                    onClick={this.handleEdit(Person.person_id)}
                  >
                    {Person.person_first + " " + Person.person_last}
                    <ListItemIcon>
                      <FontAwesomeIcon icon="id-card" />
                    </ListItemIcon>
                  </ListItem>
                ))}
              
            </List>
          </Grid>
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

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(EmployeeList)));
