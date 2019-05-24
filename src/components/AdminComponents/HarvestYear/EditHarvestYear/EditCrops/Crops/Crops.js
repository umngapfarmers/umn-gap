import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



class EditCrops extends Component {


    state = {
        newCrop: {
            type: '',
        },
        editCrop: {
            type: ''
        },
        disable: true,
        checkedA: true,
        setOpen: false,
        dialogState: '',

    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            newCrop: {
                ...this.setState,
                [propertyName]: event.target.value,
            },
            disable: false
        });
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_CROP_SOURCE' });
        this.props.dispatch({ type: 'GET_FIELD_SOURCE' });
        this.props.dispatch({ type: 'GET_LABEL_CODE' });
    }

    addCropSource = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_CROP_SOURCE', payload: this.state.newCrop })
        this.setState({
            newCrop: {
                type: '',
            },
        })
    }

    removeCropSource = (event) => {
        this.props.dispatch({ type: 'DELETE_CROP_SOURCE', payload: event.currentTarget.name })
        console.log('id is', event.currentTarget.name);
    }

    handleCheck = propertyName => (event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.checked
        })
    }

    handleClickOpen = () => {
        console.log('in click to open', this.state.setOpen);
        
        this.setState({
            setOpen: true

        })
    }

    handleClose = () => {
        this.setState({
            setOpen: false

        })
    }

    handleCloseSave = () => {
        this.setState({
            setOpen: false

        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid container spacing={24}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom>
                            Add crops you want to track
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Crops to track" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('type')}
                            value={this.state.newCrop.type}
                            style={{ width: '80vw', maxWidth: 400 }}
                        >
                        </TextField>
                        <Button size="large" color="primary"
                            onClick={this.addCropSource}
                            disabled={this.state.disable}
                        >
                            Add
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ width: '80vw', maxWidth: 300 }}
                            >
                                <Typography className={classes.heading}>My Crops</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {this.props.reduxState.cropSetup.cropSetup.map(crop =>
                                    <section key={crop.farm_crop_id} >
                                        <section style={{ display: "inline-block" }}>
                                            <Checkbox checked={this.state.checkedA}
                                                onChange={this.handleCheck('checkedA')}
                                                value="checkedA"
                                            />
                                            
                                            <Typography className={classes.heading}>{crop.farm_crop_type}</Typography>
                                            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                                Edit
                                            </Button>
                                        </section>
                                            <Dialog open={this.state.setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" key={crop.farm_crop_id}>
                                                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                                                <DialogContent >
                                                    
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        label="Email Address"
                                                        
                                                        value={crop.farm_crop_type}
                                                        fullWidth
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={this.handleClose} color="primary">
                                                        Cancel
                                                </Button>
                                                    <Button onClick={this.handleCloseSave} color="primary">
                                                        Update
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
                                    
                                        <br />
                                    </section>
                            )}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>


                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ul> My Crops:</ul>
                        {
                            this.props.reduxState.cropSetup.cropSetup.map(crop =>
                                <li key={crop.farm_crop_id} value={crop.farm_crop_id}>{crop.farm_crop_type}
                                    <Button size="large" color="primary" onClick={this.removeCropSource} name={crop.farm_crop_id}>
                                        Remove
                                    </Button>
                                </li>
                            )
                        }
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

export default connect(mapReduxStateToProps)(withStyles(styles)(EditCrops));