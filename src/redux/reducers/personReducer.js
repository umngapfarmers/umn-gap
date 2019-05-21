const getPerson = (state = [], action) => {
    if(action.type == "SET_PERSON"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default getPerson;
