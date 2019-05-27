const getRecordWaterInspectReducer = (state = [], action) => {
    if(action.type == "SET_RECORD_WATER_INSPECT"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default getRecordWaterInspectReducer;
