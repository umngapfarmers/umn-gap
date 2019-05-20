    
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateFields.css'


class CreateFields extends Component {


  state= {
    newField: {
      name: '',
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newField: {
        ...this.setState,
        [propertyName]: event.target.value,

      }
    });
  }

  addFieldSource = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_FIELD_SOURCE', payload: this.state.newField })
    this.setState({
      newField: {
        name: '',
      }
    })
  }

  removeCropSource = () => {
    this.props.dispatch({ type: 'REMOVE_FIELD_SOURCE', payload: this.state.farm_field_id })

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
              Create Fields
            </Typography>
                </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Crops to track" variant="outlined" color="primary"
              onChange={this.handleInputChangeFor('name')}
              value={this.state.newField.type}
            >
            </TextField>
            <Button size="large" color="primary" onClick={this.addFieldSource} >Add</Button>

          </Grid>
          <Grid item xs={12} sm={6}>
            <ul> My Fields:</ul>
            {
              this.props.reduxState.cropSetup.fieldSetup.map(crop =>
                <li key={crop.farm_field_id}>{crop.farm_field_name}
                  <Button size="large" color="primary" onClick={this.removeFieldSource} >
                    Remove
                </Button>
                </li>
              )
            }

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

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateFields));