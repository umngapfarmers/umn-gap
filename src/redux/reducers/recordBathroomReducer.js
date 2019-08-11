const recordBathroom = (state = [], action) => {
    if(action.type == "SET_RECORD_BATHROOM"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default recordBathroom;
