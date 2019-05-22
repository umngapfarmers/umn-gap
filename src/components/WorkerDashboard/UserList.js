import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';



class UserList extends Component {


    state = {

    }

    componentDidMount = () => {
        this.props.dispatch({ type: "FETCH_USERS" });
    };


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom align="center">
                    Employee Training Log
      </Typography>
                <List component="nav">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 0}
                        onClick={event => this.handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
                <Divider />
                <List component="nav">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 2}
                        onClick={event => this.handleListItemClick(event, 2)}
                    >
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 3}
                        onClick={event => this.handleListItemClick(event, 3)}
                    >
                        <ListItemText primary="Spam" />
                    </ListItem>
                </List>

            </React.Fragment>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});




const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(UserList));