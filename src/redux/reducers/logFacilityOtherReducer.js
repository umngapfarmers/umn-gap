const getFacilityOther = (state = [], action) => {
    if(action.type == "SET_FACILITY_OTHER_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getFacilityOther;
