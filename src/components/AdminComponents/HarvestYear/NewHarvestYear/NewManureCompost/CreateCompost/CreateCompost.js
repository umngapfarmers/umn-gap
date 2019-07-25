import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

const moment = require('moment');

// Allows farmer to create a manure source.
// Accessed as part of intial farm set up workflow and through harvest year edit
class CreateCompost extends Component {

  state= {
    farm_compost_name: '',
    farm_compost_date: moment().format('YYYY-MM-DD'),
    farm_compost_description: '',
    harvest_year_id: this.props.reduxState.user.user_id,
    farm_compost_status:true
  }

  // sets state when form is changed
  handleChangeFor = property => event => {
    this.setState({
        ...this.state,
        [property]: event.target.value
    })
  }

  componentDidMount(){
    // hits getCompsotSaga to grab list of compost sources, sets compost reducer to recieved compsost sources
    this.props.dispatch({type: 'GET_COMPOST_SOURCE'}) 
  }

  // when form is submitted, dispatches state to saga and posts form data
  onSubmit = () => {
    this.props.dispatch({type: 'ADD_COMPOST_SOURCE', payload:{...this.state}});
    this.setState({
        farm_compost_name: '',
        farm_compost_date: '',
        farm_compost_description: '',
        harvest_year_id: '',
        farm_compost_status:true
    })
  }
  
  // removes a compost source 
  handleRemove = (id) => {
    this.props.dispatch({type: 'DELETE_COMPOST_SOURCE', payload:{id,}})
  }

  // pushes pack to fertilizer dash
  handleNext = () => {
    this.props.history.push('/fertilizerdash');
  }

  // if the state is filled then the add compost button enables
  validateFilled = () => {
    if (this.state.farm_compost_name) {
      return false
    }
    else {
      
      return true
    }
  }
  
  render() {
    
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
          Create New Compost Pile 
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
                    label="Start Date" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('farm_compost_date')}
                    type="date"
                    value={this.state.farm_compost_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{width:'80vw', maxWidth:400}}
                  >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} >
            <FormControl>
                <TextField 
                    label="Name Compost" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('farm_compost_name')}
                    value={this.state.farm_compost_name}
                    style={{width:'80vw', maxWidth:400}}
                    helperText = 'required'
                  >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} >
            <FormControl>
                <TextField 
                  label = "Compost Ingredients"
                  variant="outlined" 
                  color="primary"
                  onChange={this.handleChangeFor('farm_compost_description')}
                  value={this.state.farm_compost_description}
                  style={{width:'80vw', maxWidth:400}}
                >
                </TextField>
            </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} >
          <Button disabled={this.validateFilled()} size="large" color="primary" variant="contained" onClick={this.onSubmit} style={{width:'80vw', maxWidth:400}}>Add New Compost</Button>
        </Grid>
 
        <Grid item xs={10} sm={6} >
          <ul>
            {/* checks if redux state is filled */}
            {this.props.reduxState.setupCompost[0] && this.props.reduxState.setupCompost.map(compost =>
              <li key={compost.farm_compost_id}>{compost.farm_compost_name+' '+ moment(compost.farm_compost_date).format('YYYY-MM-DD')}
                <IconButton size="large" color="primary" variant='contained' onClick={() => this.handleRemove(compost.farm_compost_id)}><FontAwesomeIcon icon='minus-circle'/></IconButton>
              </li>
            )}
          </ul>
        </Grid>  

        <Grid item xs={10} sm={6} >
          <Button size="large" color="primary" variant='contained' onClick={this.handleNext} style={{width:'80vw', maxWidth:400}}>Continue</Button>

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

export default connect(mapReduxStateToProps)(withStyles(styles)(CreateCompost));