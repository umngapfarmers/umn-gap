import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class UserList extends Component {
  state = {};

  componentDidMount = () => {
    this.props.dispatch({ type: "GET_USER" });
  };
  handleEdit = event => {};

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
              {this.props.reduxState.user[0] &&
                this.props.reduxState.user.map(User => (
                  <ListItem
                    key={User.user_id}
                    button
                    selected={this.state.selectedIndex === 0}
                    onClick={() => this.handleEdit(User.user_id)}
                  >
                    {User.person_first + " " + User.person_last}
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

export default connect(mapReduxStateToProps)(withStyles(styles)(UserList));
