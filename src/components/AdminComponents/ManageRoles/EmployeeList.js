import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';


class EmployeeList extends Component {
  state = {
      person_id:"",
      editPerson:false
  };
// Getting employee list 
  componentDidMount = () => {
    this.props.dispatch({ type: "GET_EMPLOYEE" });
  };

  // Getting the employee to edit 
    handleEdit = person_id => () => {
        this.setState({
            editPerson: true,
            selectedId: person_id
        });
        this.props.dispatch({
            type: "GET_PERSON_TO_EDIT",
            payload: person_id
        });
      this.props.history.push(`/editemployee/`)
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
            <List component="nav" style={{ width: '80vw', maxWidth: 400 }}>
              {this.props.reduxState.person[0] &&
                this.props.reduxState.person.map((Person, i) => (
                  <ListItem button
                  key={i}
                  selected={this.state.selectedIndex === 0}
                  onClick={this.handleEdit(Person.user_id)}
                  divider={true}
                >  <ListItemIcon>
                      <Typography>{i+1}</Typography>
                  </ListItemIcon>
                  {Person.person_first + " " + Person.person_last}
                  <ListItemSecondaryAction>
                      <IconButton size="small" onClick={this.handleEdit(Person.person_id)}><FontAwesomeIcon  edge="end" icon="user-edit" className={classes.fabIconColor}  style={{marginLeft: 100}}/></IconButton>
                </ListItemSecondaryAction>
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
  },
  fabIconColor:{
    color: '#7690B8',
  },
});

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(EmployeeList)));
