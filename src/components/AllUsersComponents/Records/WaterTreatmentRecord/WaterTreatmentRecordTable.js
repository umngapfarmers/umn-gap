import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const moment = require('moment');



class WaterTreatmentRecordTable extends Component {



  render() {
    console.log(this.state);
    const { classes} = this.props;
    return (
        <div style={{overflow : 'auto',fontSize: '14px'}}>
        <Table className={classes.table}
        padding='dense'
        size='small'>
        <TableHead>
          <TableRow hover='true'>
            <TableCell align="center" className={classes.tableFontBody}>Treatment Date</TableCell>
            <TableCell align="center" className={classes.tableFontBody}>Water Source</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>pH</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Temperature</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Trubidity</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Sanitizer</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Corrective Action</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordwatertreatment.map(row => (
            <TableRow key={row.treatment_id} hover='true'>
              <TableCell align="left" scope="row" className={classes.tableFontAndBorder}>{moment(row.treatment_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_water_id}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.water_ph}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.water_temp}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.turbidity}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.sanitizer}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.corrective_action}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.treatment_sig}</TableCell>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(WaterTreatmentRecordTable));