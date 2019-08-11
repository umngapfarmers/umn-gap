const recordVehicle = (state = [], action) => {
    if(action.type == "SET_RECORD_VEHICLE"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default recordVehicle;
