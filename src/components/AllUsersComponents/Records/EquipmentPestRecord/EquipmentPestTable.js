import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
const moment = require('moment');



class EquipmentPestTable extends Component {


  //maps through reducer to create table that displays selected harvest year data based on selected record
  render() {
    const { classes} = this.props;
    return (
        <div style={{overflow : 'auto',fontSize: '14px'}}>
        <Table className={classes.table}
        padding='dense'
        size='small'>
        <TableHead>
          <TableRow hover='true'>
            <TableCell align="center" className={classes.tableFontBody}>Date</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Type and Location</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Administrator</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Comments</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordPest.map(row => (
            <TableRow key={row.pest_id} hover='true'>
              <TableCell align="left" scope="row" className={classes.tableFontAndBorder}>{moment(row.pest_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_pest_type}n {row.farm_pest_location}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.pest_administrator}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.pest_comment}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.person_first} {row.person_last}</TableCell>
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
  }
});




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(EquipmentPestTable));