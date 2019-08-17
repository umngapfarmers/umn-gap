import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import swal from "sweetalert";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class EditBathroom extends Component {
  state = {
    newBathroom: {
      name: ""
    },
    dialogState: {
      array: ""
    },
    disable: true,
    disableDialog: true,
    disableDelete: true,
    checked: [],
    setOpen: false
  };

  //takes textfield input as the new value for properties within the newLabel state
  handleInputChangeFor = propertyName => event => {
    this.setState({
      newBathroom: {
        ...this.state,
        [propertyName]: event.target.value
      }
    });
    //if textfields are filled, submit button is enabled
    if (event.target.value === "") {
      this.setState({
        disable: true
      });
    } else {
      this.setState({
        disable: false
      });
    }
  };

  //registers textfield input in the edit screen as the new value for properties within the dialogState state
  handleDialogChangeFor = propertyName => event => {
    this.setState({
      dialogState: {
        array: {
          ...this.state.dialogState.array,
          [propertyName]: event.target.value
        }
      }
    });
    //disables the submit button if any of the textfields on the edit screen are left blank
    if (event.target.value === "") {
      this.setState({
        disableDialog: true
      });
    } else {
      this.setState({
        disableDialog: false
      });
    }
  };
  //renders data from database on page load via BathroomSetup saga
  componentDidMount = () => {
    this.props.dispatch({ type: "GET_BATHROOM_SOURCE" });
  };

  //adds textfield inputs to database by calling the BathroomSetup saga
  addBathroomSource = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "ADD_BATHROOM_SOURCE",
      payload: this.state.newBathroom
    });
    this.setState({
      newBathroom: {
        name: ""
      }
    });
  };

  //removes seleted water labels by calling the BathroomSetup saga and then re-rendering the label list
  // if delete is carried out, delete button is then disabled
  removeBathroomSource = () => {
    swal({
      title: `Delete (${this.state.checked.length}) Bathrooms?`,
      text:
        "These Bathrooms will be removed from your harvest year but will still appear in your records",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.dispatch({
          type: "DISABLE_BATHROOM_SOURCE",
          payload: this.state
        });
        this.props.dispatch({ type: "GET_BATHROOM_SOURCE" });
        this.setState({
          disableDelete: true,
          checked: []
        });
      }
    });
  };

  //handles wheter item is checked or not by passing through the farm_Bathroom_id of the item being clicked
  //checks state.checked for the index of the id being passed thorugh
  //if id is not already in the array, it gets added. If it is already in the array it gets spliced
  //delete button is enabled/diabled based on id's presence in array
  handleCheck = value => () => {
    const currentIndex = this.state.checked.indexOf(value);

    if (currentIndex === -1) {
      this.setState({
        ...this.state.checked.push(value),
        disableDelete: false
      });
    } else {
      this.setState({
        ...this.state.checked.splice(currentIndex, 1)
      });
    }
    //diasables delete button is state.checked is empty, enabled otherwise
    if (this.state.checked.length === 0) {
      this.setState({
        disableDelete: true
      });
    } else {
      this.setState({
        disableDelete: false
      });
    }
  };

  //opens the edit window by changing state.setOpen to true
  //passes through id of item being clicked on, the newLabel state of that id is copied to dialogState so it can be edited
  handleClickOpen = i => {
    this.setState({
      ...this.state,
      dialogState: {
        array: this.props.reduxState.setupFacilities.setupBathroomReducer[i]
      },
      setOpen: true
    });
  };

  //closes the dialog (edit) window by clicking the close button, changing state.setOpen to false
  //on clicking the update button, any changes made are sent to database by calling the BathroomSetup saga and window closes
  handleClose = event => {
    if (event.currentTarget.value === "update") {
      this.setState({
        setOpen: false
      });
      swal("Changes Saved!", "", "success");
      this.props.dispatch({
        type: "EDIT_BATHROOM_SOURCE",
        payload: this.state.dialogState.array
      });
      this.props.dispatch({ type: "GET_BATHROOM_SOURCE" });
    } else {
      this.setState({
        setOpen: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              className={classes.titleColor}
              align="center"
            >
              Add or Edit Bathrooms You Want to Track
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Bathrooms to track"
              variant="outlined"
              color="primary"
              onChange={this.handleInputChangeFor("name")}
              value={this.state.newBathroom.name}
              style={{ width: "80vw", maxWidth: 400 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={this.addBathroomSource}
              disabled={this.state.disable}
            >
              <FontAwesomeIcon
                icon="plus"
                style={{ marginRight: 5, marginTop: -2, height: 10 }}
                className={classes.fabIconColor}
              />
              <Typography className={classes.fabColor}>Add Bathrooms</Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ExpansionPanel style={{ width: "80vw", maxWidth: 300 }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>My Bathrooms</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12} sm={6}>
                  <List
                    style={{ marginLeft: -25, width: "70vw", maxWidth: 300 }}
                  >
                    {this.props.reduxState.setupFacilities.setupBathroomReducer.map(
                      (Bathroom, i) => (
                        <section key={Bathroom.farm_bathroom_id}>
                          <ListItem
                            key={Bathroom.farm_bathroom_id}
                            style={{
                              display: "flex",
                              direction: "column",
                              width: "70vw",
                              maxWidth: 270
                            }}
                            onClick={this.handleCheck(Bathroom.farm_bathroom_id)}
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                //checks for the id in state.checked array of item bing clicked on
                                //if it is present in state.checked, box appears as checked
                                checked={
                                  this.state.checked.indexOf(
                                    Bathroom.farm_bathroom_id
                                  ) !== -1
                                }
                                tabIndex={-1}
                                disableRipple
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={Bathroom.farm_bathroom_name}
                              style={{ marginLeft: "-20px" }}
                            />
                            <ListItemSecondaryAction>
                              <Button
                                variant="outlined"
                                color="primary"
                                variant="contained"
                                //onClick, the index of the item is passed through
                                onClick={event => this.handleClickOpen(i)}
                                value={Bathroom.farm_bathroom_name}
                                style={{ width: "200", maxWidth: 270 }}
                              >
                                Edit
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant="middle" />
                        </section>
                      )
                    )}
                    <Button
                      size="large"
                      color="secondary"
                      variant="contained"
                      style={{
                        marginTop: 18,
                        marginLeft: 10,
                        height: 50,
                        width: "70vw",
                        maxWidth: 280
                      }}
                      onClick={this.removeBathroomSource}
                      disabled={this.state.disableDelete}
                    >
                      <FontAwesomeIcon
                        icon="trash-alt"
                        style={{ marginRight: 10, marginTop: -2 }}
                        className={classes.fabIconColor}
                      />
                      <Typography className={classes.fabColor}>
                        Remove Bathrooms
                      </Typography>
                    </Button>
                  </List>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Dialog
              open={this.state.setOpen}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent style={{ width: "80vw", maxWidth: 200 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label={"Bathroom Name"}
                  value={this.state.dialogState.array.farm_bathroom_name}
                  onChange={this.handleDialogChangeFor("farm_bathroom_name")}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleClose}
                  value={1}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={this.handleClose}
                  value={"update"}
                  color="primary"
                  variant="contained"
                >
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
    display: "flex",
    flexWrap: "wrap"
  },
  titleColor: {
    color: "#D19124"
  }
});

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default connect(mapReduxStateToProps)(withStyles(styles)(EditBathroom));
