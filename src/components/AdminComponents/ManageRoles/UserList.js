import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
class UserList extends Component {
  state = {
  };


  componentDidMount = () => {
    this.props.dispatch({ type: "GET_USER" });
  };

  handleEdit = user_id => () => {
    console.log("edit click for id in edit user", user_id);
    this.setState({
      editUser: true,
      selectedId: user_id
    });
    this.props.dispatch({
      type: "GET_USER_TO_EDIT",
      payload: user_id
    });
    this.props.history.push(`/edituser/`)
  };

  render() {
    const { classes } = this.props;
    console.log('User state', this.state);
    return (
     
      
      <React.Fragment>
        <Typography variant="h6" gutterBottom align="center">
          Choose User to Edit
        </Typography>
        <Grid
          container
          spacing={24}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <List component="nav" style={{ width: '80vw', maxWidth: 400 }}>
              {this.props.reduxState.editUser[0] &&
                this.props.reduxState.editUser.map((User, i) => (
                  <ListItem button
                    key={i}
                    selected={this.state.selectedIndex === 0}
                    onClick={this.handleEdit(User.user_id)}
                    divider={true}
                  >  <ListItemIcon>
                        <Typography>{i+1}</Typography>
                    </ListItemIcon>
                    {User.person_first + " " + User.person_last}
                    <ListItemSecondaryAction>
                        <IconButton size="small" onClick={this.handleEdit(User.user_id)}><FontAwesomeIcon  edge="end" icon="user-edit" className={classes.fabIconColor}  style={{marginLeft: 100}}/></IconButton>
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
  title:{
    marginTop: 25,
  }
});

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(UserList)));
