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



class CompostPileRecordTable extends Component {


  render() {
    console.log(this.state);
    const { classes} = this.props;
    return (
        <div style={{overflow : 'auto',fontSize: '14px'}}>
        <Table className={classes.table}
        size='small'
        padding='dense'
        >
        
        <TableHead>
          <TableRow hover='true'>
            <TableCell align="center" className={classes.tableFontBody}>Date</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Name</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordcompostpile.map(row => (
            <TableRow key={row.farm_compost_id} hover='true'>
              <TableCell align="left" scope="row"  className={classes.tableFontAndBorder}>
              {moment(row.farm_compost_date).format('MM-DD-YYYY')}
              </TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_compost_name}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_compost_description}</TableCell>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(CompostPileRecordTable));