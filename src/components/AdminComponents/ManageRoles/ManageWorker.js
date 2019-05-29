import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import NavBar from '../../Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ManageWorker.css'

class ManageWorker extends Component {


    state = {

    }




    render() {
        const { classes } = this.props;
        return (

            <React.Fragment>
                <NavBar />

                <Typography variant="h6" gutterBottom align="center" className={classes.title}>
                    Manage Workers
            </Typography>
                    <div className={classes.manageworkdiv}>
                        < Grid container spacing={24}
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >

                            <Grid item xs={10} sm={6}>
                                <Fab
                                    variant="extended"
                                    size="large"
                                onClick={()=>this.props.history.push(`/addworker`)}
                                    color="primary"
                                    aria-label="Add"
                                    className={classes.margin}
                                >
                                    Add Worker
                                    <FontAwesomeIcon icon="user-plus" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                                </Fab>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Fab
                                    variant="extended"
                                    size="large"
                                    color="primary"
                                    onClick={() => this.props.history.push(`/editworker`)}

                                    aria-label="Add"
                                    className={classes.margin}
                                >
                                    
                                    Edit Workers
                                    <FontAwesomeIcon icon="user-edit" style={{marginLeft: 5}} className={classes.fabIconColor}/>
                                </Fab>
                            </Grid>

                        </Grid>
                    </div>

            </React.Fragment>
        );
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fabIconColor:{
      color: '#E6CD30',
    },
    fabColor:{
      color: 'white',
    },
    title:{
        marginTop: 25,
    },
    manageworkdiv:{
        marginTop: 25
    }
  });




const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(ManageWorker));