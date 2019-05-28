import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './EditCrops.css';
import Crop from './Crops/Crops';
import Field from './Fields/Fields';
import LabelCode from './LabelCodes/LabelCodes';
import Nav from '../../../../Nav/Nav';

class EditCrops extends Component {


  state= {
    
  }


  render() {
    const {classes} = this.props;
    return (
      
      <React.Fragment>

        <Nav />
        <Crop />
        <Field />
        <LabelCode />
           
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