
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './EnterFarmInformationHierarchyMenu.css'


class EnterFarmInformationHierarchyMenu extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      
      <Typography variant="h6" gutterBottom>
      Enter Farm Information Hierarchy Menu
      </Typography>
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EnterFarmInformationHierarchyMenu));