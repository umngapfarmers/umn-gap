import React, { Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ManageUserAccountsRow from './ManageUserAccountsRow';


var moment = require('moment');


class ManageUserAccountsTable extends Component {

  //Renders table body
  render() {
    const {classes} = this.props;
    return (

          <Table size='small' padding='dense'>
            <TableHead >
                <TableRow>
                  <TableCell>Farm Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Change Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.userdata.map( (user) =>
                  <ManageUserAccountsRow key={user.user_id} user={user}/> 
              )}
            </TableBody>
        </Table>   
            
    );
  }
}

const styles = theme => ({
 
 
  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(ManageUserAccountsTable));