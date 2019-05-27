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
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


class Fields extends Component {

    state = {
        newField: {
            name: '',
        },
        dialogState: {
            array: '',
        },
        disable: true,
        disableDelete: true,
        checked: [],
        setOpen: false,

    }

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            newField: {
                ...this.state.newField,
                [propertyName]: event.target.value,
            },
            dialogState: {
                array: {
                    ...this.state.dialogState.array,
                    [propertyName]: event.target.value,
                }
            },
        })
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

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_FIELD_SOURCE' });
        console.log('length is', this.state.checked.length);
        
    }

    addCropSource = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_FIELD_SOURCE', payload: this.state.newField })
        this.setState({
            newField: {
                name: ''
            }
        })
    }

    removeCropSource = () => {
        swal({
            title: `Delete (${this.state.checked.length}) fields?`,
            text: "These fields will be removed from your harvest year but will still appear in your records",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({ type: 'DISABLE_FIELD_SOURCE', payload: this.state })
                this.props.dispatch({ type: 'GET_FIELD_SOURCE' });
            }
        });
    }

    counter = () => {
        const count = this.state.checked.length;
        if(count > 0){
            return `Disable Fields (${count})`;
        }else {
            return "nothing here"

        }
    }

    handleCheck = value => () => {
        const currentIndex = this.state.checked.indexOf(value)

        if (currentIndex === -1) {
            this.setState({
                ...this.state.checked.push(value)
                /* checked: [...this.state.checked, value] */,
                disableDelete: false
            })
            
        } else {
            this.setState({
                ...this.state.checked.splice(currentIndex, 1),
            
            })
        }

        if(this.state.checked.length === 0) {
            this.setState({
                disableDelete: true
            })
        }else {
            this.setState({
                disableDelete: false
            })
        }
        console.log('state is', this.state.checked);
    }

    handleClickOpen = (i) => {
        
        this.setState({
            ...this.state,
            dialogState: {
                array: this.props.reduxState.cropSetup.fieldSetup[i],
            },
            setOpen: true,
        })
    }

    handleClose = (event) => {
        if(event.currentTarget.value === "update"){
            this.setState({
                setOpen: false

            })
            swal("Changes Saved!", "", "success");
            this.props.dispatch({ type: "EDIT_FIELD_SOURCE", payload: this.state.dialogState.array })
            this.props.dispatch({ type: "GET_FIELD_SOURCE" })
            console.log('id is', this.state.dialogState);

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
                    alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom align="center" className={classes.titleColor} align="center">
                            Add or Edit Fields 
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label="Fields to track" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('name')}
                            value={this.state.newField.name}
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
                            <Typography className={classes.fabColor}>Add Field</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <ExpansionPanel style={{width: '80vw', maxWidth: 300}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"    
                            >
                                <Typography className={classes.heading}>My Fields</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >

                                <Grid item xs={12} sm={6}>
                                    <List>
                                        {this.props.reduxState.cropSetup.fieldSetup.map((field, i) =>
                                        <Grid item xs={12} sm={6} key={field.farm_field_id}>
                                            <ListItem key={field.farm_field_id} 
                                                style={{ display: "flex", direction: "column", width: '80vw', maxWidth: 300 }}
                                                onClick={this.handleCheck(field.farm_field_id)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={this.state.checked.indexOf(field.farm_field_id) !== -1}
                                                        
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                    <ListItemText primary={field.field_name} style={{ marginLeft: "-20px"}}/>
                                                <ListItemSecondaryAction>
                                                <Button variant="outlined" color="primary" variant="contained"
                                                    onClick={event => this.handleClickOpen(i)} 
                                                    value={field.field_name}
                                                >
                                                    Edit
                                                </Button>
                                                </ListItemSecondaryAction>
                        
                                            </ListItem>
                                                <Divider variant="middle" />
                                        </Grid>
                                    )}    
                                        
                                        <Grid item xs={12} sm={6}>
                                            <Button size="large" color="secondary" variant="contained"
                                                style={{marginTop: 18, marginLeft: 10, height:50, width: "60vw"}}
                                                onClick={this.removeCropSource}
                                                disabled={this.state.disableDelete}
                                            >
                                                <FontAwesomeIcon icon="trash-alt" style={{ marginRight: 10, marginTop: -2  }} className={classes.fabIconColor} />
                                                <Typography className={classes.fabColor}>Remove Fields</Typography>
                                            </Button>
                                        </Grid>  

                                    </List>
                                </Grid>   

                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Dialog open={this.state.setOpen} aria-labelledby="form-dialog-title">
                            <DialogContent style={{ width: '80vw', maxWidth: 200 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={"Field Name"}
                                    value={this.state.dialogState.array.field_name}
                                    onChange={this.handleInputChangeFor('field_name')}
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

export default connect(mapReduxStateToProps)(withStyles(styles)(Fields));