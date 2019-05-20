
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateCrops.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';


class CreateCrops extends Component {


  state= {
    newCrop:'',
    
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      newCrop: {
        newCrop: event.target.value,

      }
    });
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
              List all crops you want to track
            </Typography>

          </Grid>
               
                <Grid item xs={12} sm={6}>
            <TextField label="Crops to track" variant="outlined" color="primary"
              onChange={this.handleInputChangeFor('newCrop')}
              value={this.state.newCrop}
            >
            </TextField>
            <Button size="large" color="primary" onClick={this.addWaterSource} >Add</Button>
                   
                </Grid>
          
          <Grid item xs={12} sm={6}>
          <ul> My Crops:</ul>
            {
              this.props.reduxState.movies.movieReducer.map(movie =>
                <li key={movie.id}></li> 
              )
            }

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

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateCrops));