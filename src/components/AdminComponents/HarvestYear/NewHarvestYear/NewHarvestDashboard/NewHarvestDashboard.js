import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './NewHarvestDashboard.css'


class NewHarvestDashboard extends Component {


  state = {
    newHarvestYear: {
      harvest_year: '',
      farm_id: '',

    }
  }

  yearDate = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];


  handleChange = propertyName => {
    return (event) => {
      this.setState({
        newHarvestYear: {
          ...this.state.newHarvestYear,
          [propertyName]: event.target.value,
          farm_id: this.props.reduxState.user.farm_registry_id,
        }
      });
    }
  }

  handleCreate = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_HARVEST_YEAR', payload: this.state.newHarvestYear });
    this.props.history.push('/newfarminfo')
  }
  
  handlePrevious = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'IMPORT_HARVEST', payload: this.state.newHarvestYear });
    this.props.history.push('/edithierarchy')
  }

  handleError = () => {
    if (this.state.newHarvestYear.harvest_year !== '') {
      return (
      <>
        <Grid item xs={12} sm={6}>
          <Button size="large" color="primary" variant={'contained'} onClick={this.handleCreate} >Create New Year</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button size="large" color="primary" variant={'contained'} onClick={this.handlePrevious} >Use Previous Year</Button>
        </Grid>
      </>
      )
    }
    else {
      return (
      <>
        <Grid item xs={8} sm={6}>
          <Button size="large" color="primary" variant={'contained'} disabled >Create New Year</Button>
        </Grid>
        <Grid item xs={8} sm={6}>
          <Button size="large" color="primary" variant={'contained'} disabled >Use Previous Year</Button>
        </Grid>
      </>
      )
    }
  }


  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
            <Typography variant="h6" gutterBottom align="center">
                New Harvest Year
            </Typography>
        <Grid container spacing={24}
          container
          direction="column"
          justify="center"
          alignItems="center">

          <Grid item xs={12} sm={6}>
            <TextField
              id="harvest_year"
              select
              label="Select New Harvest Year"
              value={this.state.newHarvestYear.harvest_year}
              onChange={this.handleChange('harvest_year')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
              variant="outlined"
              style={{ width: 250 }}
            >
              <MenuItem disabled>Select a New Harvest Year</MenuItem>
              {this.yearDate.map(year =>
                <MenuItem value={year} key={year} >{year}</MenuItem>
              )}

            </TextField>
          </Grid>

            {this.handleError()}
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

export default connect( mapReduxStateToProps )(withStyles(styles)(NewHarvestDashboard));