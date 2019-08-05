const getPest = (state = [], action) => {
    if(action.type == "SET_PEST_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getPest;
