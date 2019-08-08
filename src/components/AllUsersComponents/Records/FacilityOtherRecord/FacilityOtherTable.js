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



class FacilityOther extends Component {


      //FUNCTION- toggles the check of the checkbox
      displayFacilityOtherCleaned = (facility_other_cleaned) => {
        if (facility_other_cleaned == true){
            return (
            <Typography>Yes</Typography>
            )
        }
    
        else if (facility_other_cleaned == false){
            return (
                <Typography>No</Typography>
                )
        }
    }

       //FUNCTION- toggles the check of the checkbox
       displayFacilityOtherSanitized = (facility_other_sanitized) => {
        if (facility_other_sanitized == true){
            return (
            <Typography>Yes</Typography>
            )
        }
    
        else if (facility_other_sanitized == false){
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
            <TableCell align="center"  className={classes.tableFontBody}>Cleaned</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Sanitized</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Area</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Comments</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordFacilityOther.map(row => (
            <TableRow key={row.facility_other_id} hover='true'>
              <TableCell align="left" scope="row" className={classes.tableFontAndBorder}>{moment(row.facility_other_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.farm_facility_other_name}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{this.displayFacilityOtherCleaned(row.facility_other_cleaned)}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{this.displayFacilityOtherSanitized(row.facility_other_sanitized)}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.facility_other_area}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.facility_other_comment}</TableCell>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(FacilityOther));