import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


// Allows farmer to create a new equipment
// Accessed as part of intial farm set up workflow and through harvest year edit
// access at "/newFirstaid"
class CreateFirstaid extends Component {

  state = {
    farm_packing_name: ''
  };

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value
    });
  };

  validateFilled = () => {
    if (this.state.farm_packing_name) {
      return false
    } else {

      return true
    };
  };

  onSubmit = () => {
    this.props.dispatch({
      type: 'ADD_FIRSTAID',
      payload: {
        ...this.state
      }
    });
    this.setState({
      farm_packing_name: ''
    });
  };

  handleRemove = (id) => {
    this.props.dispatch({
      type: 'DELETE_FIRSTAID',
      payload: {
        id,
      }
    });
  };

  componentDidMount(){
    this.props.dispatch({type: 'GET_FIRSTAID'});
  };
  
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
          Create New Firstaid
      </Typography>
      <Grid 
        container 
        spacing={24}
        direction = "column"
        justify = "center"
        alignItems = "center"
      >
        <Grid item xs={10} sm={6} >
            <FormControl>
                <TextField 
                    label="Firstaid Name" 
                    variant="outlined" 
                    color="primary"
                    onChange = {
                      this.handleChangeFor('farm_packing_name')
                    }
                    value = {
                      this.state.farm_packing_name
                    }
                    style={{width:'80vw', maxWidth:400}}
                  >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} >
          <Button 
            disabled={this.validateFilled()} 
            size="large" color="primary" 
            variant="contained" 
            onClick={this.onSubmit} 
            style={{width:'80vw', maxWidth:400}}>
              Add New Firstaid
            </Button>
        </Grid>
        
         <Grid item xs={10} sm={6} >
           <Button  
              size="large" 
              color="primary" 
              variant="contained" 
              onClick={()=>this.props.history.push('/newequipment')} 
              style={{width:'80vw', maxWidth:400}}>
                Back to Equipment
            </Button>
        </Grid>

        <Grid item xs={10} sm={6} >
          <ul>
            {/* checks if redux state is filled */}
            {
              this.props.reduxState.faciltiesReducer.firstaid[0] && this.props.reduxState.facilitiesReducer.firstaid.map(equipment =>
              <li key={equipment.farm_firstaid_id}>{equipment.farm_packing_name}
                <IconButton size="large" color="primary" variant='contained' onClick={() => this.handleRemove(equipment.farm_firstaid_id)}><FontAwesomeIcon icon='minus-circle'/></IconButton>
              </li>
            )}
          </ul>
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

export default connect(mapReduxStateToProps)(withStyles(styles)(CreateFirstaid));