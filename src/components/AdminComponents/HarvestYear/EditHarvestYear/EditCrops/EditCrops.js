import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './EditCrops.css';
import Crops from './Crops/Crops';
import Fields from './Fields/Fields';
import Nav from '../../../../Nav/Nav';


class EditCrops extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      
      <React.Fragment>
        <Nav />
        <Crops />
        <Fields />
            
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