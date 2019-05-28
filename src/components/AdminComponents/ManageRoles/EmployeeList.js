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



class EmployeeList extends Component {
  state = {
      person_id:"",
      editPerson:false
  };

  componentDidMount = () => {
    this.props.dispatch({ type: "GET_PERSON" });
  };
    handleEdit = person_id => () => {
        console.log("edit click for id", person_id);
        this.setState({
            editPerson: true,
            selectedId: person_id
        });
       // this.props.history.push(`/editemployee/?id=${person_id}`);
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
            <List component="nav">
              {this.props.reduxState.person[0] &&
                this.props.reduxState.person.map(Person => (
                  <ListItem
                    key={Person.person_id}
                    button
                    //selected={this.state.selectedIndex === 0}
                    onClick={this.handleEdit(Person.person_id)}
                  >
                    {Person.person_first + " " + Person.person_last}
                    
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
