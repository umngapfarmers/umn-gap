import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
const moment = require('moment');



class CompostTurningRecordTable extends Component {

    //FUNCTION- toggles the check of the checkbox
    displayCompostTurn = (compost_turned) => {
        if (compost_turned == true){
            return (
            <Typography>Yes</Typography>
            )
        }
    
        else if (compost_turned == false){
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
        size='small'
        padding='dense'
        >
        
        <TableHead>
          <TableRow hover='true'>
            <TableCell align="center" className={classes.tableFontBody}>Name</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Turned</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Date</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Temp 1</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Temp 2</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Temp 3</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Temp 4</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Label Code</TableCell>
            <TableCell align="center"  className={classes.tableFontBody}>Signature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.reduxState.recordcompostturn.map(row => (
            <TableRow key={row.compost_id} hover='true'>
              <TableCell align="left" scope="row"  className={classes.tableFontAndBorder}>
                {row.farm_compost_name}
              </TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{this.displayCompostTurn(row.compost_turned)}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{moment(row.compost_date).format('MM-DD-YYYY')}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.test_area_1_temp}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.test_area_2_temp}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.test_area_3_temp}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.test_area_4_temp}</TableCell>
              <TableCell align="left"  className={classes.tableFontAndBorder}>{row.label_code_text}</TableCell>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(CompostTurningRecordTable));