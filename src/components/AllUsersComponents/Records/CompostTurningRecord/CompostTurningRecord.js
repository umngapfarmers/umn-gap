import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CompostTurningRecord.css'
import Nav from '../../../Nav/Nav';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class CompostTurningRecord extends Component {

  state= {
    selectHarvestYear: '',
  }

  componentDidMount() {
    this.props.dispatch({type:'GET_HARVEST_YEAR'});
  }

  handleChange = propertyName => {
    return event => {
      this.setState({
        ...this.state,
        [propertyName]: event.target.value,
      })
      }
    }
  



  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Compost Turning Record
      </Typography>
      <Grid container spacing={24}
        direction="column"
        justify="center"
        alignItems="center">
         
         <Grid item xs={12} sm={6}>
            <TextField
                    id="harvest_year"
                    select
                    label="Select Record Harvest Year"
                    value={this.state.selectHarvestYear}
                    onChange={this.handleChange('selectHarvestYear')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    style={{width: 250}}
                  >
                    <MenuItem disabled>Select Record Harvest Year</MenuItem>
                    {this.props.reduxState.recordyear.map( year =>
                          <MenuItem value={year.harvest_id} key={year.harvest_id} >{year.harvest_year}</MenuItem>
                          )}
                        
                  </TextField> 
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

export default connect( mapReduxStateToProps )(withStyles(styles)(CompostTurningRecord));