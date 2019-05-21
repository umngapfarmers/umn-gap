
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateWaterSourcesLabelCodes.css'
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class CreateWaterSourcesLabelCodes extends Component {


  state= {
    newLabel: {
      farm_water_source_id: '',
      label_code_id: '',
    }
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      
      <Grid container spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center">
         
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Create Water SOurce with label codes
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Crop</InputLabel>
              <Select
                value={this.state.newLabel.farm_crop_id}
                onChange={this.handleChangeFor('farm_crop_id')}
              >
                <MenuItem value="">
                  <em>Label Code</em>
                </MenuItem>
                {this.props.reduxState.cropSetup.cropSetup.map(crop =>
                  <MenuItem key={crop.farm_crop_id}
                    value={crop.farm_crop_id}
                  >
                    {crop.farm_crop_type}
                  </MenuItem>
                )}
              </Select>
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateWaterSourcesLabelCodes)));