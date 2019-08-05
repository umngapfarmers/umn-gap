const getVehicle = (state = [], action) => {
    if(action.type == "SET_VEHICLE_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getVehicle;
