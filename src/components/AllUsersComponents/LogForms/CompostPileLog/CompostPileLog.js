import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CompostPileLog.css'
import Nav from '../../../Nav/Nav';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const moment = require('moment');

class CompostPileLog extends Component {


  state= {
    entry:{
      compost_date: moment().format('YYYY-MM-DD'),
      farm_compost_id: '',
      compost_turned: false,
      test_area_1_temp: '',
      test_area_2_temp: '',
      test_area_3_temp: '',
      test_area_4_temp: '',
      label_code_id: '',
      compost_sig: '',
    }
  }

  handleChangeFor = property => event => {
    
    this.setState({
      entry:{
        ...this.state.entry,
        [property]: event.target.value
      }
    })
  }

  handleCheck = (event) => {
    console.log(`in handleCheck`);
    
    this.setState({
      entry:{
        ...this.state.entry,
        compost_turned: event.target.checked
      }
    })
  }

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_PERSON'})
    this.props.dispatch({type: 'GET_COMPOST_SOURCE'}) 
    this.props.dispatch({type: 'GET_LABEL_CODE'})

  }

  validateFilled = () => {
    console.log('validation')
    if(this.state.entry.farm_compost_id && this.state.entry.compost_sig){
      console.log(`valdiated`)
      return false
    }
    else {
      console.log(`unvalidated`);
      
      return true
    }
  }

  handleSubmit = () => {
    this.props.dispatch({type: 'ADD_COMPOST_LOG', payload: this.state.entry});
    this.setState({
      entry: {
        compost_date: moment().format('YYYY-MM-DD'),
        farm_compost_id: '',
        compost_turned: false,
        test_area_1_temp: '',
        test_area_2_temp: '',
        test_area_3_temp: '',
        test_area_4_temp: '',
        label_code_id: '',
        compost_sig: '',
      }
    })
  }

  render() {

    console.log(`state in compost pile log `, this.state);
    

    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom>
         Compost Treatment and Application
      </Typography>
      < Grid 
        container 
        spacing = {
          8
        }
        direction = "column"
        justify = "center"
        alignItems = "center" 
      >
          <Grid item xs={12} >
            <FormControl>
                <TextField 
                    margin="dense"
                    label="Compost Pile" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('farm_compost_id')}
                    value={this.state.entry.farm_compost_id}
                    select
                    width={'100%'}
                    style={{width:'80vw', maxWidth:400}}
                  >
                    {this.props.reduxState.setupCompost[0] && this.props.reduxState.setupCompost.map(
                      compost => 
                        <MenuItem key = {compost.farm_compost_id} value = {compost.farm_compost_id}>
                          {compost.farm_compost_name}
                        </MenuItem>
                    )}
                </TextField>
            </FormControl>
          </Grid>
         
          <Grid item xs={12}>
            <FormControl>
                <TextField 
                    margin = "dense"
                    label="Entry Date" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('compost_date')}
                    type="date"
                    value={this.state.entry.compost_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{width:'80vw', maxWidth:400}}
                  >
                </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  onChange={this.handleCheck} 
                  value={this.state.entry.compost_turned}
                  checked={this.state.entry.compost_turned}
                />
              }
              label="Compost Turned"
            />
          </Grid>
          
          <Grid 
            container 
            item 
            xs={12} 
       
            spacing = {16}
            justify="center"
            alignItems="center"
          >
              <Grid item xs={4}            
                align="right"

              >
                <FormControl>
                    <TextField 
                        margin="dense"

                        label = "Temp 1"
                        variant="outlined" 
                        color="primary"
                        onChange={this.handleChangeFor('test_area_1_temp')}
                        type="string"
                        value = {
                          this.state.entry.test_area_1_temp
                        }
  

                      >
                    </TextField>
                </FormControl>
              </Grid>
              <Grid  item xs={4} >
                <FormControl>
                    <TextField 
                        margin="dense"
                        label = "Temp 2"
                        variant="outlined" 
                        color="primary"
                        onChange={this.handleChangeFor('test_area_2_temp')}
                        type="string"
                        value = {
                          this.state.entry.test_area_2_temp
                        }


                      >
                    </TextField>
                </FormControl>
              </Grid>
          </Grid>
          <Grid 
            container 
            item 
            xs={12} 
            spacing = {16}
            justify="center"
            alignItems="center"
          >
              <Grid item xs={4} align={'right'}>
                <FormControl>
                    <TextField 
                        margin = "dense"
                        label = "Temp 3"
                        variant="outlined" 
                        color="primary"
                        onChange={this.handleChangeFor('test_area_3_temp')}
                        type="string"
                        value = {
                          this.state.entry.test_area_3_temp
                        }
   

                      >
                    </TextField>
                </FormControl>
              </Grid>
              <Grid  item xs={4}>
                <FormControl>
                    <TextField 
                        margin = "dense"
                        label = "Temp 4"
                        variant="outlined" 
                        color="primary"
                        onChange={this.handleChangeFor('test_area_4_temp')}
                        type="string"
                        value = {
                          this.state.entry.test_area_4_temp
                        }
 
                      >
                    </TextField>
                </FormControl>
              </Grid>
          </Grid>      
          
          <Grid item xs={12}>
            <FormControl>
                <TextField
                    margin = "dense"
                    label="Applied to" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('label_code_id')}
                    value={this.state.entry.label_code_id}
                    select
                    style={{width:'80vw', maxWidth:400}}
                >
                    {this.props.reduxState.labelCode[0] && this.props.reduxState.labelCode.map(
                      labelCode =>
                        <MenuItem key = {labelCode.label_code_id} value = {labelCode.label_code_id}>
                          {labelCode.label_code_text}
                        </MenuItem>
                    )}
                </TextField>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl>
                <TextField
                    margin = "dense"
                    label="Signature" 
                    variant="outlined" 
                    color="primary"
                    onChange={this.handleChangeFor('compost_sig')}
                    value={this.state.entry.compost_sig}
                    select
                    style={{width:'80vw', maxWidth:400}}
                  >
                    {this.props.reduxState.person[0] && this.props.reduxState.person.map(
                      person => 
                        <MenuItem key = {person.person_id} value = {person.person_id}>
                          {person.person_first + ' ' + person.person_last}
                        </MenuItem>
                    )}
                </TextField>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              disabled={this.validateFilled()} 
              size="large" 
              color="primary" 
              variant='contained' 
              style={{width:'80vw', maxWidth:400}}
              onClick={this.handleSubmit}
            >
              Submit
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

export default connect( mapReduxStateToProps )(withStyles(styles)(CompostPileLog));