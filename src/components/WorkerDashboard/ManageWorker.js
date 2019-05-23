import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import './WorkerDashboard.css'
import NavBar from '../NavBar/NavBar';


class ManageWorker extends Component {


    state = {

    }




    render() {
        const { classes } = this.props;
        return (

            <React.Fragment>
                <NavBar />

                <Typography variant="h6" gutterBottom>
                    Manage Workers
            </Typography>
                < Grid container spacing={24}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >

                    <Grid item xs={10} sm={6}>
                        <Fab
                            variant="extended"
                            size="large"
                            color="primary"
                            aria-label="Add"
                            className={classes.margin}
                        >
                            <NavigationIcon className={classes.extendedIcon} />
                            Add Worker
        </Fab>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <Fab
                            variant="extended"
                            size="large"
                            color="primary"
                            aria-label="Add"
                            className={classes.margin}
                        >
                            <NavigationIcon className={classes.extendedIcon} />
                            Edit Workers
        </Fab>
                    </Grid>

                </Grid>

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

export default connect(mapReduxStateToProps)(withStyles(styles)(ManageWorker));