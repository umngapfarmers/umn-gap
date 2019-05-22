
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
import Button from '@material-ui/core/Button';


class CreateWaterSourcesLabelCodes extends Component {


  state= {
    newLabel: {
      farm_water_source_id: '',
      label_code_id: '',
    },
    disable: true,
    disableNext: true
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'GET_WATER_SOURCE' });
    this.props.dispatch({ type: 'GET_LABEL_CODE' });
  }

  handleChangeFor = propertyName => {
    return (event) => {
      this.setState({
        newLabel: {
          ...this.state.newLabel,
          [propertyName]: event.target.value,
        },
        disable: false
      })
    }
  }

  addWaterLabel = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_WATER_LABEL', payload: this.state.newLabel })
    this.setState({
      newLabel: {
        farm_water_source_id: '',
        label_code_id: '',
      },
      disableNext: false
    })
  }

  removeLabelCode = (event) => {
    this.props.dispatch({ type: 'DELETE_WATER_LABEL', payload: event.currentTarget.name })

  }

  nextPage = () => {
    this.props.history.push('/newfarminfo');
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
              Create Water Source with label codes
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Water Source</InputLabel>
              <Select
                value={this.state.newLabel.farm_water_source_id}
                onChange={this.handleChangeFor('farm_water_source_id')}
                style={{ width: '80vw', maxWidth: 400 }}
              >
                <MenuItem value="">
                  <em>Water Source</em>
                </MenuItem>
                {this.props.reduxState.waterSetup.waterSource.map(water =>
                  <MenuItem key={water.farm_water_source_id}
                    value={water.farm_water_source_id}
                  >
                    {water.farm_water_source_name}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Label Code</InputLabel>
              <Select
                value={this.state.newLabel.label_code_id}
                onChange={this.handleChangeFor('label_code_id')}
                style={{ width: '80vw', maxWidth: 400 }}
              >
                <MenuItem value="">
                  <em>Label Code</em>
                </MenuItem>
                {this.props.reduxState.labelCode.map(code =>
                  <MenuItem key={code.label_code_id}
                    value={code.label_code_id}
                  >
                    {code.label_code_text}
                  </MenuItem>
                )}
              </Select>
              <Button size="large" color="primary" 
              onClick={this.addWaterLabel} 
              disabled={this.state.disable} 
              >
              Add
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            
            {
              this.props.reduxState.waterSetup.waterLabel.map(label =>
                <ul key={ label.farm_water_source_id }
                > 
                {label.farm_water_source_name}:
                  <li>{label.label_code_text}
                    <Button size="large" color="primary"
                    onClick={this.removeLabelCode}
                    name={label.farm_water_source_id}>
                    Remove
                  </Button>
                  </li>
                  </ul>
        )
      }
            <Grid item xs={12} sm={6}>
              <Button size="large" color="primary" 
              onClick={this.nextPage} 
              disabled={this.state.disableNext}
              >
              Next
              </Button>
            </Grid>

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