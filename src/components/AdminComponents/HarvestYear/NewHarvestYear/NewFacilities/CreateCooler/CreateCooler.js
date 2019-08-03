import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

const moment = require('moment');

// Allows farmer to create a manure source.
// Accessed as part of intial farm set up workflow and through harvest year edit
class CreateCooler extends Component {

    state = {
        farm_cooler_name: '',
        harvest_year_id: this.props.reduxState.user.user_id,
        farm_cooler_status: true
    }

    // sets state when form is changed
    handleChangeFor = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }

    componentDidMount() {
        // hits getCompsotSaga to grab list of cooler sources, sets cooler reducer to recieved compsost sources
        this.props.dispatch({ type: 'GET_COOLER_SOURCE' })
    }

    // when form is submitted, dispatches state to saga and posts form data
    onSubmit = () => {
        this.props.dispatch({ type: 'ADD_COOLER_SOURCE', payload: { ...this.state } });
        this.setState({
            farm_cooler_name: '',
            harvest_year_id: '',
            farm_cooler_status: true
        })
    }

    // removes a cooler source 
    handleRemove = (id) => {
        this.props.dispatch({ type: 'DELETE_COOLER_SOURCE', payload: { id, } })
    }

    // pushes pack to fertilizer dash
    handleNext = () => {
        this.props.history.push('/fertilizerdash');
    }

    // if the state is filled then the add cooler button enables
    validateFilled = () => {
        if (this.state.farm_cooler_name) {
            return false
        }
        else {

            return true
        }
    }

    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom align="center">
                    Create New Cooler
      </Typography>
                <Grid
                    container
                    spacing={24}
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={10} sm={6} >
                        <FormControl>
                            <TextField
                                label="Start Date"
                                variant="outlined"
                                color="primary"
                                onChange={this.handleChangeFor('farm_cooler_date')}
                                type="date"
                                value={this.state.farm_cooler_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '80vw', maxWidth: 400 }}
                            >
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={10} sm={6} >
                        <FormControl>
                            <TextField
                                label="Name cooler"
                                variant="outlined"
                                color="primary"
                                onChange={this.handleChangeFor('farm_cooler_name')}
                                value={this.state.farm_cooler_name}
                                style={{ width: '80vw', maxWidth: 400 }}
                                helperText='required'
                            >
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={10} sm={6} >
                        <FormControl>
                            <TextField
                                label="cooler Ingredients"
                                variant="outlined"
                                color="primary"
                                onChange={this.handleChangeFor('farm_cooler_description')}
                                value={this.state.farm_cooler_description}
                                style={{ width: '80vw', maxWidth: 400 }}
                            >
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={10} sm={6} >
                        <Button disabled={this.validateFilled()} size="large" color="primary" variant="contained" onClick={this.onSubmit} style={{ width: '80vw', maxWidth: 400 }}>Add New Cooler</Button>
                    </Grid>

                    <Grid item xs={10} sm={6} >
                        <ul>
                            {/* checks if redux state is filled */}
                            {this.props.reduxState.setupcooler[0] && this.props.reduxState.setupcooler.map(cooler =>
                                <li key={cooler.farm_cooler_id}>{cooler.farm_cooler_name + ' ' + moment(cooler.farm_cooler_date).format('YYYY-MM-DD')}
                                    <IconButton size="large" color="primary" variant='contained' onClick={() => this.handleRemove(cooler.farm_cooler_id)}><FontAwesomeIcon icon='minus-circle' /></IconButton>
                                </li>
                            )}
                        </ul>
                    </Grid>

                    <Grid item xs={10} sm={6} >
                        <Button size="large" color="primary" variant='contained' onClick={this.handleNext} style={{ width: '80vw', maxWidth: 400 }}>Continue</Button>

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

export default connect(mapReduxStateToProps)(withStyles(styles)(CreateCooler));