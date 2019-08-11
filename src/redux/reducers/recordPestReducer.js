const recordPest = (state = [], action) => {
    if(action.type == "SET_RECORD_PEST"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default recordPest;
