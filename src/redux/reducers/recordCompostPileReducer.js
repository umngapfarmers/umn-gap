const getRecordCompostPileReducer = (state = [], action) => {
    if(action.type == "SET_RECORD_COMPOST_PILE"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default getRecordCompostPileReducer;
