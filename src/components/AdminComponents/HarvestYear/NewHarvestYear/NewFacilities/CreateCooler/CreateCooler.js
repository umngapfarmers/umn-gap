import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateCooler.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';


class CreateCooler extends Component {


    state = {
        newCooler: {
            name: '',
        },

    }
    //takes textfield input as the new value for properties within the newLabel state
    //if textfields are filled, submit button is enabled
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            newCooler: {
                ...this.setState,
                [propertyName]: event.target.value,
            },
            disable: false
        });
    }

    //adds textfield inputs to database by calling the CoolerSetup saga
    addCoolerSource = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_COOLER_SOURCE', payload: this.state.newCooler });
        this.setState({
            newCooler: {
                name: '',
            },
            disableNext: false
        })
    }

    //deletes selected Cooler via CoolerSetup saga
    removeCoolerSource = (event) => {
        this.props.dispatch({ type: 'DELETE_COOLER_SOURCE', payload: event.currentTarget.name });
    }

    // //navigates to the add field page for farm creation
    // nextPage = () => {
    //     this.props.history.push('/field');
    // }


    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>

                <Grid container spacing={24}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">

                    <Grid item xs={10} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Add coolers you want to track
                        </Typography>
                    </Grid>

                    <Grid item xs={10} sm={6}>
                        <TextField label="Coolers to track" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('name')}
                            value={this.state.newCooler.name}
                            style={{ width: '80vw', maxWidth: 400 }}
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={10} sm={6}>
                        <Button size="large" color="primary" variant="contained"
                            style={{width:'80vw', maxWidth:400}}
                            onClick={this.addCoolerSource}
                            disabled={this.state.disable}
                        >
                            Add New Facility
                        </Button>
                    </Grid>

                    <Grid item xs={10} sm={6}>
                        <Button  
                        size="large" 
                        color="primary" 
                        variant="contained" 
                        onClick = {
                            () => this.props.history.push('/createfacilitiesselect')
                        }
                        style={{width:'80vw', maxWidth:400}}>
                            Back to Facility Select
                        </Button>

                    </Grid>
                </Grid>

                <Grid item xs={10} sm={6}>
                    <ul>
                        {this.props.reduxState.setupFacilities.setupCoolerReducer.map(cooler =>
                            <li key={cooler.farm_cooler_id} value={cooler.farm_cooler_id}>{cooler.farm_cooler_name}
                                <IconButton size="small" color="primary" variant="contained"
                                    onClick={this.removeCoolerSource}
                                    name={cooler.farm_cooler_id}
                                >
                                    <FontAwesomeIcon icon='minus-circle' />
                                </IconButton>
                            </li>
                        )}
                    </ul>
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

export default withRouter(connect(mapReduxStateToProps)(withStyles(styles)(CreateCooler)));