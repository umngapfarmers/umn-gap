    
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateWaterSources.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'


class CreateWaterSources extends Component {


  state= {
    waterSource:"",
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [propertyName]: event.target.value,
        
      }
    });
  }


  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Create Water Sources
            </Typography>
            <Grid container spacing={24}
            container
            direction="column"
            justify="center"
            alignItems="center">
               
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <TextField label="Water Sources" variant="outlined" color="primary"
                      onChange={this.handleInputChangeFor('registrationCode')}
                      type="password"
                      value={this.state.newUser.registrationCode}
                    >
                    </TextField>
                    <Button size="large" color="primary" onClick={this.registerUser} >Register</Button>
                  </FormControl>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateWaterSources));