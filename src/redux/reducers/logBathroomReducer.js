const getBathroom = (state = [], action) => {
    if(action.type == "SET_BATHROOM_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getBathroom;
