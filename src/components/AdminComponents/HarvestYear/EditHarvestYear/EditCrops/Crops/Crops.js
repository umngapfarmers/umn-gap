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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class EditCrops extends Component {

    state = {
        newCrop: {
            type: '',
        },
        dialogState: {
            array: '',
        },
        disable: true,
        checkedA: [],
        setOpen: false,

    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            newCrop: {
                ...this.state,
                [propertyName]: event.target.value,
            }, 
            dialogState: {
                array: {
                    ...this.state.dialogState.array,
                    [propertyName]: event.target.value,
                }
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
            dialogState: {
                array: this.props.reduxState.cropSetup.cropSetup[i],
            },
            setOpen: true,
        })
        console.log('sate is', this.dialogState);
        
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
        this.props.dispatch({type: "EDIT_CROP_SOURCE", payload: this.state.dialogState.array})
        this.props.dispatch({ type: "GET_CROP_SOURCE"})
        console.log('id is', this.state.dialogState);
        

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
                        <ExpansionPanel style={{width: '80vw', maxWidth: 300}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                
                            >
                                <Typography className={classes.heading}>My Crops</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{height: 400}}>
                                <Grid item xs={12} sm={6}>
                                    <List>
                                        {this.props.reduxState.cropSetup.cropSetup.map((crop, i) =>
                                            <ListItem key={crop.farm_crop_id} 
                                            style={{display: "flex", direction: "column", width: '80vw', maxWidth: 300}}
                                            >
                                                <ListItemText primary={crop.farm_crop_type} />
                                                <ListItemSecondaryAction style={{  maxWidth: 300 }}>
                                                <Button variant="outlined" color="primary" 
                                                onClick={event => this.handleClickOpen(i)} 
                                                value={crop.farm_crop_type}
                                                >
                                                    Edit
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        )}            
                                    </List>
                                </Grid>   
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Grid item xs={12} sm={6}>
                            <Dialog open={this.state.setOpen} aria-labelledby="form-dialog-title">
                                <DialogContent style={{ width: '80vw', maxWidth: 400 }}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label={"Crop Name"}
                                        value={this.state.dialogState.array.farm_crop_type}
                                        onChange={this.handleInputChangeFor('farm_crop_type')}
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