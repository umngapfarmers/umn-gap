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
        dialogState: [],

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

    handleClickOpen = (i) => {
        
        this.setState({
            ...this.state,
            dialogState: this.props.reduxState.cropSetup.cropSetup[i],
            setOpen: true,

        })
        console.log('in click to open', this.state.dialogState);
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            setOpen: false

        })
    }

    handleCloseSave = () => {
        this.setState({
            ...this.state,
            setOpen: false

        })
        this.props.dispatch({type: "EDIT_CROP_SOURCE", payload: this.state.editCrop})
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
                                {this.props.reduxState.cropSetup.cropSetup.map((crop, i) =>
                                <Grid item xs={12} sm={6} key={crop.farm_crop_id}
                                style={{ display: "flex", direction: "column"}}
                                >
                                    <Grid item xs={12} sm={6}
                                            style={{ display: "flex"}}
                                        >
                                        <Checkbox checked={this.state.checkedA}
                                            onChange={this.handleCheck('checkedA')}
                                            value="checkedA"
                                        />
                                        <Typography className={classes.heading}>{crop.farm_crop_type}</Typography>
                                        <Button variant="outlined" color="primary" onClick={event => this.handleClickOpen(i)} value={crop.farm_crop_type}>
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                                <Grid item xs={12} sm={6}>
                                    <Dialog open={this.state.setOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                        <DialogContent >
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Crop Name"
                                                value={this.state.dialogState.farm_crop_type}
                                                onChange={this.handleInputChangeFor('editCrop')}
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
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
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