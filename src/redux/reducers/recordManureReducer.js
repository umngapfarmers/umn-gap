const getRecordManureReducer = (state = [], action) => {
    if(action.type == "SET_RECORD_MANURE"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default getRecordManureReducer;
