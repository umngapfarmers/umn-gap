const getLabelCode = (state = [], action) => {
    if(action.type == "SET_LABEL_CODE"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default getLabelCode;
