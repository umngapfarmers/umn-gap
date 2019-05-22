import React, {Component} from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import './CreateLabelCodes.css'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class CreateLabelCodes extends Component {


  state= {
    newLabel: {
      farm_crop_id:'',
      farm_field_id: '',
      label_code_text: '',
    },
    disable: true,
    disableNext:true
    
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'GET_CROP_SOURCE' });
    this.props.dispatch({ type: 'GET_FIELD_SOURCE' });
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

  addNewLabel = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_LABEL_CODE', payload: this.state.newLabel })
    this.setState({
      newLabel: {
        farm_crop_id: '',
        farm_field_id: '',
        label_code_text: '',
      },
      disableNext: false
    })
  }

  removeLabelCode = (event) => {
    this.props.dispatch({ type: 'DELETE_LABEL_CODE', payload: event.currentTarget.name })

  }

  nextPage = () => {
    this.props.history.push('/newfarminfo')
    this.props.dispatch({ type:'SET_MENU_BOOLEAN', payload: 1})
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
              Create Label Codes
            </Typography>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Crop</InputLabel>
              <Select
                value={this.state.newLabel.farm_crop_id}
                onChange={this.handleChangeFor('farm_crop_id')}
                style={{ width: '80vw', maxWidth: 400 }}
                >
                <MenuItem value="">
                  <em>Crop</em>
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
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Field</InputLabel>
              <Select
                value={this.state.newLabel.farm_field_id}
                onChange={this.handleChangeFor('farm_field_id')}
                style={{ width: '80vw', maxWidth: 400 }}
                >
                <MenuItem value="">
                  <em>Field</em>
                </MenuItem>
                {this.props.reduxState.cropSetup.fieldSetup.map(field =>
                  <MenuItem key={field.farm_field_id} 
                  value={field.farm_field_id}
                  >
                  {field.field_name}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Name Your Label Code" variant="outlined" color="primary"
              onChange={this.handleChangeFor('label_code_text')}
              value={this.state.newLabel.label_code_text}
              style={{ width: '80vw', maxWidth: 400 }}
            >
            </TextField>
            <Button size="large" color="primary" 
            onClick={this.addNewLabel} 
            disabled={this.state.disable}
            >
            Add
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ul> My labels:</ul>
            {
              this.props.reduxState.labelCode.map(code =>
                <li key={code.label_code_id}>{code.label_code_text}
                  <Button size="large" color="primary"
                    onClick={this.removeLabelCode}
                    name={code.label_code_id}>
                    Remove
                </Button>
                </li>
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
          <Grid item xs={12} sm={6}>
            
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

export default withRouter(connect( mapReduxStateToProps )(withStyles(styles)(CreateLabelCodes)));