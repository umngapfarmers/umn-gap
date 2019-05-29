import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Nav from '../../../Nav/Nav';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;



var docDef = {
    content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]

}



class ExportDash extends Component {


  state= {
    selectHarvestYear: '',
  }

  componentDidMount() {
    this.props.dispatch({type:'GET_HARVEST_YEAR'});
  }

  handleChange = propertyName => {
    return event => {
      this.setState({
        ...this.state,
        [propertyName]: event.target.value,
      })
      }
    }

    handleSubmit = () => {
        this.props.dispatch({type:'GET_EXPORT_PDF', payload: this.state.selectHarvestYear})
        

    }

    handleError = () => {
      if(this.state.selectHarvestYear !== ''){
        return (
          <Button onClick={this.handleSubmit} variant="contained" color="primary"
          style={{width:'80vw', maxWidth:400}}>Download</Button>
        )
      }
      else{
        return(
          <Button disabled variant="contained" color="primary"
          style={{width:'80vw', maxWidth:400}}>Download</Button>
        )
      }
    }

  



  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Nav/>
      <Typography variant="h6" gutterBottom align="center">
         Export Records to PDF
      </Typography>
      <Grid container spacing={24}
        direction="column"
        justify="center"
        alignItems="center">
         
         <Grid item xs={12} sm={6}>
            <TextField
                    id="harvest_year"
                    select
                    label="Select Record Harvest Year"
                    value={this.state.selectHarvestYear}
                    onChange={this.handleChange('selectHarvestYear')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                    style={{width:'80vw', maxWidth:400}}
                  >
                    <MenuItem disabled>Select Record Harvest Year</MenuItem>
                    {this.props.reduxState.recordyear.map( year =>
                          <MenuItem value={year.harvest_id} key={year.harvest_id} >{year.harvest_year}</MenuItem>
                          )}
                        
                  </TextField> 
            </Grid>

            <Grid item xs={12} sm={6}>
                 {this.handleError()}
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

export default connect(mapReduxStateToProps)(withStyles(styles)(ExportDash));