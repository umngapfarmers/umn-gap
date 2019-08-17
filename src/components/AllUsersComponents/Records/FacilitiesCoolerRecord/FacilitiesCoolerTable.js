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



class FacilitiesCoolerTable extends Component {


      //FUNCTION- toggles the check of the checkbox
      displayCoolerCleaned = (cooler_cleaned) => {
        if (cooler_cleaned == true){
            return (
            <Typography>Yes</Typography>
            )
        }
    
        else if (cooler_cleaned == false){
            return (
                <Typography>No</Typography>
                )
        }
    }

       //FUNCTION- toggles the check of the checkbox
       displayCoolerSanitized = (cooler_sanitized) => {
        if (cooler_sanitized == true){
            return (
            <Typography>Yes</Typography>
            )
        }
    
        else if (cooler_sanitized == false){
            return (
                <Typography>No</Typography>
                )
        }
    }

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
            <TableCell align="center"  className={classes.tableFontBody}>Name</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Temperature</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Cleaned</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Sanitized</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Area</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Comments</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordCooler.map(row => (
            <TableRow key={row.cooler_id} hover='true'>
              <TableCell align="left" scope="row" className={classes.tableFontAndBorder}>{moment(row.cooler_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_cooler_name}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.cooler_temperature}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{this.displayCoolerCleaned(row.cooler_cleaned)}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{this.displayCoolerSanitized(row.cooler_sanitized)}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.cooler_area}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.cooler_comment}</TableCell>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(FacilitiesCoolerTable));