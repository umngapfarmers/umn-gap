const getThermometer = (state = [], action) => {
    if(action.type == "SET_THERMOMETER_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getThermometer;
