import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const moment = require('moment');



class EmployeeTrainingRecord extends Component {


   //maps through reducer to create table that displays selected harvest year data based on selected record
  render() {
    const { classes} = this.props;
    return (
        <div style={{overflow : 'auto',fontSize: '14px'}}>
        <Table className={classes.table}
        size='small'
        padding='dense'
        >
        
        <TableHead>
          <TableRow hover='true'>
            <TableCell align="center" className={classes.tableFontBody}>Topic</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Person Trained</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Trainer</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Date Trained</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordemployee.map(row => (
            <TableRow key={row.employee_training_id} hover='true'>
              <TableCell align="left" scope="row"  className={classes.tableFontAndBorder}>
                {row.topic}
              </TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.person_first} {row.person_last}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.trainer_name}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{moment(row.date_trained).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.employee_training_sig}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    );
  }
}

const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  tableFontBody:{
    fontSize: 12,
  },
  tableFontAndBorder:{
    fontSize: 12,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderCollapse: 'collapse',
  },
});




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(EmployeeTrainingRecord));