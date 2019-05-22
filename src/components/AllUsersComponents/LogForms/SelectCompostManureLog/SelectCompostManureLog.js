// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './SelectCompostManureLog.css'


// class SelectCompostManureLog extends Component {


//   state= {
    
//   }


// // 

//   render() {
//     const {classes} = this.props;
//     return (
//       <React.Fragment>
//       <Typography variant="h6" gutterBottom align="center">
//          Select Compost Manure Log
//       </Typography>
//       <Grid container spacing={24}>
         
//           <Grid item xs={12} sm={6}>
//             <List>
//                 <ListItem button onClick={() => {this.props.history.push('/manurelog')}}>
//                   <ListItemText primary="Manure Log"/>
//                   < ListItemIcon>
//                     <FontAwesomeIcon icon="horse" />
//                 </ListItemIcon>
//                 </ListItem>
//                 <ListItem button onClick={() => {this.props.history.push('/compostlog')}}>
//                 <ListItemText primary="Compost Log"/>
//                 <ListItemIcon>
//                     <FontAwesomeIcon icon="recycle"/>
//                   </ListItemIcon>
//               </ListItem>
//             </List>
//           </Grid>

//       </Grid>
     
//   </React.Fragment>
//     );
//   }
// }

// const styles = theme => ({
//   container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//   },
// });


// const mapReduxStateToProps = (reduxState) => ({
//   reduxState,
// });

// export default connect( mapReduxStateToProps )(withStyles(styles)(SelectCompostManureLog));