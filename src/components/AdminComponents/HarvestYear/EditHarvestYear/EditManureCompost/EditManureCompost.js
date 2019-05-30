import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import './EditManureCompost.css';
import Compost from './Compost/Compost';
import Manure from './Manure/Manure';
import Nav from '../../../../Nav/Nav';


class EditManureCompost extends Component {


  state= {
    
  }

  pageBack = () => {
    this.props.history.push('/edithierarchy')
  }


  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>

        <Nav />
        <Manure />
        <Compost />
        <Grid container spacing={24}
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: 30 }}
        >
          <Grid item xs={12} sm={8}>
            <Button onClick={this.pageBack}
              color="primary"
              variant="contained"
              style={{ marginBottom: 40, width: '80vw', maxWidth: 400 }}>
              Main Edit Menu
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

export default connect( mapReduxStateToProps )(withStyles(styles)(EditManureCompost));