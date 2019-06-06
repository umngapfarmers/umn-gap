import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const moment = require('moment');



class WaterInspectRecordTable extends Component {

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
            <TableCell align="center" className={classes.tableFontBody}>Date Inspected</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Water Source</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Distribution System</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Observation</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Corrective Action</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordwaterinspect.map(row => (
            <TableRow key={row.inspection_id} hover='true'>
              <TableCell align="left" scope="row"  className={classes.tableFontAndBorder}>{moment(row.inspection_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_water_source_name}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.distribution}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.observation}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.inspection_corrective_action}</TableCell>
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
  },
});




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(WaterInspectRecordTable)); 