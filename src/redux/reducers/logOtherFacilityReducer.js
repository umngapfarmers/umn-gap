const getOtherFacility = (state = [], action) => {
    if(action.type == "SET_OTHER_FACILITY_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getOtherFacility;
