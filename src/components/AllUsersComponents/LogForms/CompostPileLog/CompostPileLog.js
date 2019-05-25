import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CompostPileLog.css'
import Nav from '../../../Nav/Nav';

class CompostPileLog extends Component {


  state= {
    entry:{
      compost_date:'',
      farm_compost_id: '',
      compost_turned: '',
      test_area_1_temp: '',
      test_area_2_temp: '',
      test_area_3_temp: '',
      test_area_4_temp: '',
      label_code_id: '',
      compost_sig: '',
    } 
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom>
         Compost Pile Log
      </Typography>
      <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FormControl>
                <TextField 
                    label="Entry Date" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('compost_date')}
                    type="date"
                    value={this.state.entry.compost_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                </TextField>
            </FormControl>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <FormControl>
                <TextField 
                    label="Entry Date" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('compost_date')}
                    type="date"
                    value={this.state.entry.compost_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                </TextField>
            </FormControl>
          </Grid>

      </Grid>
     
  </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
});



const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(CompostPileLog));