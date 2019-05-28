import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
const moment = require('moment');


class ManureCompostDash extends Component {

    navToCompost = () => {
        this.props.history.push('/createcompost');
    }

    navToManure = () => {
        this.props.history.push('/createmanure');
    }

    navToNewFarmInfo = () => {
        this.props.history.push('/newfarminfo');
        this.props.dispatch({type: 'SET_MENU_BOOLEAN', payload: 2})
    }

    validateFilled =()=>{
        if(this.props.reduxState.setupManure[0]&&this.props.reduxState.setupCompost[0]){
            return (
                <Button variant="contained" color="primary" onClick={this.navToNewFarmInfo} style={{width:'80vw', maxWidth:400}}>Continue</Button>
            )
        }
        else{
            return (
                <Button disabled variant="contained" color="primary" onClick={this.navToNewFarmInfo} style={{width:'80vw', maxWidth:400}}>Input Manure and Compost</Button>
            )
        }
    }

    render() {
        
        const {classes} = this.props;

        return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom align="center">
            Create New Compost Pile 
        </Typography>
        <Grid 
            container 
            spacing={24}
            direction = "column"
            justify = "center"
            alignItems = "center"
        >
                <Grid item xs={10} sm={6}>
                    <Button variant="contained" color="primary" onClick={this.navToManure} style={{width:'80vw', maxWidth:400}}>Setup Manure</Button>
                </Grid>

                <Grid item xs={10} sm={6}>
                    <Button variant="contained" color="primary" onClick={this.navToCompost} style={{width:'80vw', maxWidth:400}}>Setup Compost</Button>
                </Grid>

                <Grid item xs={10} sm={6}>
                    {this.validateFilled()}
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

export default connect(mapReduxStateToProps)(withStyles(styles)(ManureCompostDash));