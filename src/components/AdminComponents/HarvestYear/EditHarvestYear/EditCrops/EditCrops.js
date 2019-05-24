import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './EditCrops.css';
import CropComponent from './Crops/Crops';


class EditCrops extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      
      <React.Fragment>
        <CropComponent />
            
            <Grid container spacing={24}>
               
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EditCrops));