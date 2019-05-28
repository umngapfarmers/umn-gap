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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

var moment = require('moment');


class ManageUserAccountsRow extends Component {

  state ={
    currentlyEditing: false,
    userAccount:{
        user_id: this.props.user.user_id,
        user_status: this.props.user.user_status,
    },
    checked: false,
        

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
    // this.props.dispatch({type: 'GET_ANSWERS', payload: this.props.classData });
}

//FUNCTION- handle change for input-- set state with input values
handleChange = propertyName => {
    return(event) =>{
    console.log(event);
    this.handleCheck()
    this.setState({
        studentScore: {
            ...this.state.userAccount,
            [propertyName]: event.target.value,

        }
    });
  }
}

handleCheck = () => {
    this.setState({
        checked: !this.state.checked,
    })
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
           <FormControl component="fieldset" className={classes.formControl}>
          
            <FormControlLabel value="TRUE" 
                control={<Radio   value={this.state.userAccount.user_status}
                onChange={this.handleChange('user_status')}
                icon={<RadioButtonUncheckedIcon/>}
                checkedIcon={<RadioButtonCheckedIcon/>}/>} label="Active" checked={this.state.checked}/>
            
            <FormControlLabel value="FALSE" 
                control={<Radio value={this.state.userAccount.user_status}
                onChange={this.handleChange('user_status')}
                icon={<RadioButtonUncheckedIcon/>}
                checkedIcon={<RadioButtonCheckedIcon/>}/>} label="Inactive" checked={this.state.checked}/>
                
           </FormControl>
            :
            statusToDisplay}
        </TableCell>

        <TableCell >
            { this.state.currentlyEditing === true ? 
                <IconButton aria-label="Add" onClick={this.handleEditSubmit}> <Add/> </IconButton> :
                <IconButton aria-label="Edit" onClick={this.handleEdit} >
              <Edit/>
           </IconButton>
            }
        </TableCell>

        </TableRow>

        
    );
  }
}

const styles = theme => ({
 

  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ManageUserAccountsRow));