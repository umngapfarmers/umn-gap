    
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './CreateLabelCodes.css'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


class CreateLabelCodes extends Component {


  state= {
    
  }




  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create Label Codes
      </Typography>
      <Grid container spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center">
         
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type-simple">Type</InputLabel>
              <Select
                value={this.state.newProject.tag_id}
                onChange={this.handleChangeFor('tag_id')}
                inputProps={{
                  name: 'type',
                  id: 'type-simple',
                }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.props.reduxState.tags.map(tag =>
                  <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>
                )}
              </Select>
            </FormControl>
             
          </Grid>
          <Grid item xs={12} sm={6}>

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

export default connect( mapReduxStateToProps )(withStyles(styles)(CreateLabelCodes));