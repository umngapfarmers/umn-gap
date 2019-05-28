import React, { Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add'
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

var moment = require('moment');


class ManageUserAccountsRow extends Component {

  state ={
    currentlyEditing: false,
    userAccount:{
        user_id: '',
        user_status: '',
    },
    checkedActive: false,
    checkedInactive: false,
        

    }
handleDelete = (event) => {
  event.preventDefault();
  console.log('in handleDelete');

}

//FUNCTION- on click of edit set currentlyEditing state to true to enable toggled conditional rendering--
//score table cell becomes input field
handleEdit = (event) => {
  console.log('in handleEdit');
  let user_id = event.currentTarget.value;
  this.setState({
    currentlyEditing: true,
    userAccount:{
      user_id: this.props.user.user_id,
      user_status: this.props.user.user_status,
    }
  })
  console.log(this.state.currentlyEditing);


}

//FUNCTION- on click of add set currentlyEditing state to false to disable edit conditional rendering
//dispatch updatedStudent to saga to server to db to update student score
handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');
    this.setState({
        currentlyEditing: false,
    })
    this.props.dispatch({type: 'EDIT_USER', payload: this.state.userAccount});
    this.props.dispatch({type: 'GET_ALL_USERS'})
}

// //FUNCTION- handle change for input-- set state with input values
// handleChangeActive = propertyName => {
//     return(event) =>{
//     this.setState({
//         checkedActive: !this.state.checkedActive,
//         userAccount: {
//             ...this.state.userAccount,
//             [propertyName]: event.target.value,

//         }
//     });
//   }
// }

// handleChangeInactive = propertyName => {
//     return(event) =>{
//     console.log('Inactive value is:', event.target.value);
//     this.setState({
//         checkedInactive: !this.state.checkedInactive,
//         userAccount: {
//             ...this.state.userAccount,
//             [propertyName]: event.target.value,

//         }
//     });
//   }
// }
handleChange = (propertyName) => {
  return (event) => {
    this.setState({
      userAccount:{
        ...this.state.userAccount,
        [propertyName]: event.target.value,
      }
    })
  }
}





  render() {
    const {classes} = this.props;
    console.log(this.state.userAccount);
    let statusToDisplay = null;

    if(this.props.user.user_status === true){
        statusToDisplay = <Typography>Active</Typography>
    }

    if(this.props.user.user_status === false){
        statusToDisplay = <Typography>Inactive</Typography>
    }

    return (
        <TableRow key={this.props.user.user_id} hover={true} >

        <TableCell>
            {this.props.user.farm_name}
        </TableCell>

        <TableCell>
            {this.props.user.username}
        </TableCell>

        <TableCell>
           {this.state.currentlyEditing === true ? 
              <TextField
              select
              label="Status"
              value={this.state.userAccount.user_status}
              onChange={this.handleChange('user_status')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.labelRoot
                }
              }}
              InputProps={{ classes: { root: classes.inputRoot } }}
              className={classes.dropDown}
            >
                <MenuItem style={{fontSize: 12, height:12}} disable='disable'>
                  Select User Status
                </MenuItem>

                <MenuItem key={true} value={true} style={{fontSize: 12, height:12}}>
                  Active
                </MenuItem>

                <MenuItem key={false} value={false} style={{fontSize: 12, height:12}}>
                  Inactive
                </MenuItem>
            </TextField>
            :
            statusToDisplay}
        </TableCell>

        <TableCell>
            { this.state.currentlyEditing === true ? 
                <IconButton aria-label="Add" onClick={this.handleEditSubmit}> <Add/><Typography className={classes.buttonFont}>Submit</Typography></IconButton> :
                <IconButton aria-label="Edit" onClick={this.handleEdit} >
              <Edit/><Typography className={classes.buttonFont}>Edit</Typography>
           </IconButton>
            }
        </TableCell>

        </TableRow>

        
    );
  }
}

const styles = theme => ({
  labelRoot:{
    fontSize: 12,
  },
  buttonFont:{
    fontSize: 12
  },
  dropDown:{
    margin: 0,
  }
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ManageUserAccountsRow));

 //  <FormControl component="fieldset" className={classes.formControl}>
          //   <RadioGroup
          //   value={this.state.userAccount.user_status}
          //   // onChange={handleChange}
          // ></RadioGroup>
          //   <FormControlLabel
          //       control={<Radio   value={true}
          //       onClick={this.handleChangeActive('user_status')}
          //       icon={<RadioButtonUncheckedIcon/>}
          //       checkedIcon={<RadioButtonCheckedIcon/>}
          //       checked={this.state.checkedActive}
          //       />} label="Active" 
          //      />
            
          //   <FormControlLabel
          //       control={<Radio value={false}
          //       onClick={this.handleChangeInactive('user_status')}
          //       icon={<RadioButtonUncheckedIcon/>}
          //       checkedIcon={<RadioButtonCheckedIcon/>}
          //       checked={this.state.checkedInactive}
          //       />} label="Inactive"
          //       />

          //  </FormControl>