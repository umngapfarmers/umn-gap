import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


class LabelCodes extends Component {

    state = {
        newLabel: {
            crop_id: '',
            field_id: '',
            label_code: '',
        },
        dialogState: {
            array: '',
        },
        disable: true,
        disableDelete: true,
        checked: [],
        setOpen: false,

    }

    //takes textfield input as the new value for properties within the newLabel state
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            newLabel: {
                ...this.state.newLabel,
                [propertyName]: event.target.value,
            },
        })
        //if textfields are filled, submit button is enabled
        if (this.state.newLabel.crop_id && this.state.newLabel.field_id && this.state.newLabel.label_code) {
            this.setState({
                disable: false
            })

        } else {
            this.setState({
                disable: true
            })
        }
    }

    //registers textfield input in the edit screen as the new value for properties within the dialogState state
    handleDialogChangeFor = propertyName => (event) => {
        this.setState({
            dialogState: {
                array: {
                    ...this.state.dialogState.array,
                    [propertyName]: event.target.value,
                }
            },
        })
        //disables the submit button if any of the textfields on the edit screen are left blank
        if (event.target.value === '') {
            this.setState({
                disable: true
            })

        } else {
            this.setState({
                disable: false
            })
        }
    }

    //renders data from database on page load via getLabelCodesSaga
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_CROP_SOURCE' });
        this.props.dispatch({ type: 'GET_FIELD_SOURCE' });
        this.props.dispatch({ type: 'GET_LABEL_CODE' });
    }

    //adds textfield inputs to database by calling the getLabelCodesSaga
    addCropSource = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_LABEL_CODE', payload: this.state.newLabel })
        this.setState({
            newLabel: {
                crop_id: '',
                field_id: '',
                label_code: '',
            },
        })
    }

    //removes seleted water labels by calling the cropSetup saga and then re-rendering the label list
    // if delete is carried out, delete button is then disabled
    removeCropSource = () => {
        swal({
            title: `Delete (${this.state.checked.length}) labels?`,
            text: "These labels will be removed from your harvest year but will still appear in your records",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({ type: 'DISABLE_LABEL_CODE', payload: this.state })
                this.props.dispatch({ type: 'GET_LABEL_CODE' });
                this.setState({
                    disableDelete: true,
                    checked: []
                    
                })
            }
        });
    }

    //handles wheter item is checked or not by passing through the farm_crop_id of the item being clicked
    //checks state.checked for the index of the id being passed thorugh
    //if id is not already in the array, it gets added. If it is already in the array it gets spliced
    //delete button is enabled/diabled based on id's presence in array
    handleCheck = value => () => {
        const currentIndex = this.state.checked.indexOf(value)

        if (currentIndex === -1) {
            this.setState({
                ...this.state.checked.push(value),
                disableDelete: false

            })
            
        } else {
            this.setState({
                ...this.state.checked.splice(currentIndex, 1),
            
            })
        }
        //diasables delete button is state.checked is empty, enabled otherwise
        if(this.state.checked.length === 0) {
            this.setState({
                disableDelete: true
            })
        }else {
            this.setState({
                disableDelete: false
            })
        }
    }

    //opens the edit window by changing state.setOpen to true
    //passes through id of item being clicked on, the newLabel state of that id is copied to dialogState so it can be edited
    handleClickOpen = (i) => {
        
        this.setState({
            ...this.state,
            dialogState: {
                array: this.props.reduxState.labelCode[i],
            },
            setOpen: true,
        })
    }

    //closes the dialog (edit) window by clicking the close button, changing state.setOpen to false 
    //on clicking the update button, any changes made are sent to database by calling the setupLabelCodesSaga and window closes
    handleClose = (event) => {
        if(event.currentTarget.value === "update"){
            this.setState({
                setOpen: false

            })
            swal("Changes Saved!", "", "success");
            this.props.dispatch({ type: "EDIT_LABEL_CODE", payload: this.state.dialogState.array })
            this.props.dispatch({ type: "GET_LABEL_CODE" })

        } else {
            this.setState({
                setOpen: false
            })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                
                <Grid container spacing={24}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{marginTop: 30}}
                    >
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom align="center" className={classes.titleColor} align="center">
                            Add or Edit LabelCodes
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <FormControl>
                            <TextField
                                label="Crop Name"
                                variant="outlined"
                                color="primary"
                                onChange={this.handleInputChangeFor('crop_id')}
                                value={this.state.newLabel.crop_id}
                                style={{ width: '80vw', maxWidth: 400 }}
                                select
                            >
                                {this.props.reduxState.cropSetup.cropSetup.map(crop=> (
                                    <MenuItem key={crop.farm_crop_id} value={crop.farm_crop_id}>
                                        {crop.farm_crop_type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <FormControl>
                            <TextField
                                label="Field Name"
                                variant="outlined"
                                color="primary"
                                onChange={this.handleInputChangeFor('field_id')}
                                value={this.state.newLabel.field_id}
                                style={{ width: '80vw', maxWidth: 400 }}
                                select
                            >
                                {this.props.reduxState.cropSetup.fieldSetup.map(field => (
                                    <MenuItem key={field.farm_field_id} value={field.farm_field_id}>
                                        {field.field_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label="Label Code Name" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('label_code')}
                            value={this.state.newLabel.label_code}
                            style={{ width: '80vw', maxWidth: 400, }}
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                         <Button size="large" color="primary" variant="contained"
                            onClick={this.addCropSource}
                            disabled={this.state.disable}
                        >
                            <FontAwesomeIcon icon="plus" style={{ marginRight: 5, marginTop:-2, height: 10 }} className={classes.fabIconColor} />
                            <Typography className={classes.fabColor}>Add Label</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <ExpansionPanel style={{width: '80vw', maxWidth: 300}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"    
                            >
                                <Typography className={classes.heading}>My LabelCodes</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >

                                <Grid item xs={12} sm={6}>
                                    <List style={{ marginLeft: -25, width: '70vw', maxWidth: 300 }}>
                                        {this.props.reduxState.labelCode.map((code, i) =>
                                        <section key={code.label_code_id}>
                                            <ListItem key={code.label_code_id} 
                                                style={{ display: "flex", direction: "column", width: '70vw', maxWidth: 270 }}
                                                onClick={this.handleCheck(code.label_code_id)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        //checks for the id in state.checked array of item bing clicked on
                                                        //if it is present in state.checked, box appears as checked
                                                        checked={this.state.checked.indexOf(code.label_code_id) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                    <ListItemText primary={code.label_code_text} style={{ marginLeft: "-20px"}}/>
                                                <ListItemSecondaryAction>
                                                <Button variant="outlined" color="primary" variant="contained"
                                                    //onClick, the index of the item is passed through
                                                    onClick={event => this.handleClickOpen(i)} 
                                                    value={code.label_code_text}
                                                    style={{ width: '200', maxWidth: 270 }}
                                                >
                                                    Edit
                                                </Button>
                                                </ListItemSecondaryAction>
                        
                                            </ListItem>
                                            <Divider variant="middle" />
                                        </section>
                                    )}    
                                        <Button size="large" color="secondary" variant="contained"
                                            style={{marginTop: 18, marginLeft: 10, height:50, width: "70vw", maxWidth: 280}}
                                            onClick={this.removeCropSource}
                                            disabled={this.state.disableDelete}
                                        >
                                            <FontAwesomeIcon icon="trash-alt" style={{ marginRight: 10, marginTop: -2  }} className={classes.fabIconColor} />
                                            <Typography className={classes.fabColor}>Remove LabelCodes</Typography>
                                        </Button>
                                    </List>
                                </Grid>   

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Dialog open={this.state.setOpen} aria-labelledby="form-dialog-title">
                            <DialogContent style={{ width: '80vw', maxWidth: 200 }}>
                                <TextField
                                    label="Crop Name"
                                    variant="outlined"
                                    color="primary"
                                    value={this.state.dialogState.array.farm_crop_id}
                                    onChange={this.handleDialogChangeFor('farm_crop_id')}
                                    style={{marginRight: 10, marginBottom: 30, width: 180,}}
                                    select
                                >
                                    {this.props.reduxState.cropSetup.cropSetup.map(crop => (
                                        <MenuItem key={crop.farm_crop_id} value={crop.farm_crop_id}>
                                            {crop.farm_crop_type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Field Name"
                                    variant="outlined"
                                    color="primary"
                                    value={this.state.dialogState.array.farm_field_id}
                                    onChange={this.handleDialogChangeFor('farm_field_id')}
                                    style={{ marginRight: 10, marginBottom: 30, width: 180, }}
                                    select
                                >
                                    {this.props.reduxState.cropSetup.fieldSetup.map(field => (
                                        <MenuItem key={field.farm_field_id} value={field.farm_field_id}>
                                            {field.field_name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={"Label Name"}
                                    value={this.state.dialogState.array.label_code_text}
                                    onChange={this.handleDialogChangeFor('label_code_text')}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} value={1} color="primary" variant="contained">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleClose} value={"update"} color="primary" variant="contained">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
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
    titleColor: {
        color: '#D19124',
    }
});


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(withStyles(styles)(LabelCodes));