const getCooler = (state = [], action) => {
    if(action.type == "SET_COOLER_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getCooler;
