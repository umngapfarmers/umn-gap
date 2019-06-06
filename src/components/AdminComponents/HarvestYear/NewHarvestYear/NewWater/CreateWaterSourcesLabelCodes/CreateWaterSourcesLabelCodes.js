
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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';


// Allows farmer to create a water-label source.
// Accessed as part of intial farm set up workflow and through harvest year edit
class CreateWaterSourcesLabelCodes extends Component {


  state= {
    newLabel: {
      water_id: '',
      label_code: '',
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
        water_id: '',
        label_code: '',
      },
      disableNext: false
    })
  }

  removeLabelCode = (event) => {
    this.props.dispatch({ type: 'DELETE_WATER_LABEL', payload: event.currentTarget.name })

  }

  nextPage = () => {
    this.props.history.push('/');
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
              value={this.state.newLabel.water_id}
              onChange={this.handleChangeFor('water_id')}
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
              value={this.state.newLabel.label_code}
              onChange={this.handleChangeFor('label_code')}
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
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button size="large" color="primary" variant="conatined"
            onClick={this.addWaterLabel}
            disabled={this.state.disable}
          >
          Add
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}> 
          {this.props.reduxState.waterSetup.waterLabel.map(label =>
            <ul key={ label.farm_water_id }>
                <li>{label.farm_water_source_name + ': '+ label.label_code_text}
                  <IconButton size="small" color="primary" variant="contained"
                  onClick={this.removeLabelCode}
                  name={label.farm_water_id}
                  >
                    <FontAwesomeIcon icon='minus-circle'/>
                  </IconButton>
                </li>
              </ul>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button size="large" color="primary" variant="contained"
          onClick={this.nextPage} 
          disabled={this.state.disableNext}
          >
          Next
          </Button>
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