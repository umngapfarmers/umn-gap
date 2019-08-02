const getPacking = (state = [], action) => {
    if(action.type == "SET_PACKING_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getPacking;
