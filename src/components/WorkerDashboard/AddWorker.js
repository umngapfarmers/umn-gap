import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Form from '@material-ui/core/FormControl';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar/NavBar';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        //width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});
class AddWorker extends Component {

    state = {
        UserName: "",
        Password: "",
        FirstName: "",
        LastName: ""
};

    // handles on inputs on form and sets state
    handleChange = property => event => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
        console.log("in handle change", event.target.value);
    };

    // handles form submit button, sends post dispatch to redux with payload of all selected form inputs + clears form
    handleSubmit = () => {
        console.log("in handle submit", this.state);

        this.props.dispatch({ type: "POST_WORKER", payload: this.state });
        this.setState({
            UserName: "",
            Password: "",
            FirstName: "",
            LastName: ""

        });
    };

    render() {
        const { classes } = this.props;

    return (

        <React.Fragment>
            <NavBar/>
            <Typography variant="h6" gutterBottom>
                Registration
      </Typography>
            <Form
                ref="form"
                //justify="center"
                //alignItems="center"
                fullWidth
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
           >
            <Grid container spacing={24}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
               
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="uName"
                        name="uName"
                        label="User Name"
                        fullWidth
                        autoComplete="User Name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="password"
                        fullWidth
                        autoComplete="password"
                    />
                </Grid>
                <Grid item xs={8} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        //fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="lname"
                    />
                </Grid>

            </Grid>
            </Form>
        </React.Fragment>

    );
}
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(AddWorker));

