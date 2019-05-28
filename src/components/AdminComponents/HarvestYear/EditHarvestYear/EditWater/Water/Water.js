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


class Water extends Component {

    state = {
        newWaterSource: {
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
            newWaterSource: {
                ...this.state,
                [propertyName]: event.target.value,
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

    handleDialogChangeFor = propertyName => (event) => {
        this.setState({
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
        this.props.dispatch({ type: 'GET_WATER_SOURCE' });
        console.log('length is', this.state.checked.length);
        
    }

    addCropSource = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_WATER_SOURCE', payload: this.state.newWaterSource })
        this.setState({
            newWaterSource: {
                name: ''
            }
        })
    }

    removeCropSource = () => {
        swal({
            title: `Delete (${this.state.checked.length}) water sources?`,
            text: "These sources will be removed from your harvest year but will still appear in your records",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({ type: 'DISABLE_WATER_SOURCE', payload: this.state })
                this.props.dispatch({ type: 'GET_WATER_SOURCE' });
                this.setState({
                    disableDelete: true
                })
            }
        });
    }

    counter = () => {
        const count = this.state.checked.length;
        if(count > 0){
            return `Disable Water (${count})`;
        }else {
            return "nothing here"

        }
        console.log('count is', count);
        
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
            console.log('in splice');
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
                array: this.props.reduxState.waterSetup.waterSource[i],
            },
            setOpen: true,
        })
        console.log('sate is', this.dialogState);
        
    }

    handleClose = (event) => {
        if(event.currentTarget.value === "update"){
            this.setState({
                setOpen: false

            })
            swal("Changes Saved!", "", "success");
            this.props.dispatch({ type: "EDIT_WATER_SOURCE", payload: this.state.dialogState.array })
            this.props.dispatch({ type: "GET_WATER_SOURCE" })
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
                    alignItems="center"
                    style={{marginTop: 20}}
                    >
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom align="center" className={classes.titleColor} align="center">
                            Add or Edit Water Sources You Want to Track
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label="Water to track" variant="outlined" color="primary"
                            onChange={this.handleInputChangeFor('name')}
                            value={this.state.newWaterSource.name}
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
                            <Typography className={classes.fabColor}>Add Water Source</Typography>
                        </Button>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <ExpansionPanel style={{width: '80vw', maxWidth: 300}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"    
                            >
                                <Typography className={classes.heading}>My Water Sources</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails >

                                <Grid item xs={12} sm={6}>
                                    <List style={{ marginLeft: -25, width: '70vw', maxWidth: 300 }}>
                                        {this.props.reduxState.waterSetup.waterSource.map((water, i) =>
                                        <section key={water.farm_water_source_id}>
                                            <ListItem key={water.farm_water_source_id} 
                                                style={{ display: "flex", direction: "column", width: '70vw', maxWidth: 270 }}
                                                onClick={this.handleCheck(water.farm_water_source_id)}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={this.state.checked.indexOf(water.farm_water_source_id) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                    <ListItemText primary={water.farm_water_source_name} style={{ marginLeft: "-20px"}}/>
                                                <ListItemSecondaryAction>
                                                <Button variant="outlined" color="primary" variant="contained"
                                                    onClick={event => this.handleClickOpen(i)} 
                                                    value={water.farm_water_source_name}
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
                                                <Typography className={classes.fabColor}>Remove Water Sources</Typography>
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
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={"Water Label"}
                                    value={this.state.dialogState.array.farm_water_source_name}
                                    onChange={this.handleDialogChangeFor('farm_water_source_name')}
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

export default connect(mapReduxStateToProps)(withStyles(styles)(Water));