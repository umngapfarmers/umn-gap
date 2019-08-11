const recordThermometer = (state = [], action) => {
    if(action.type == "SET_RECORD_THERMOMETER"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default recordThermometer;
