const getRecordHarvestYearReducer = (state = [], action) => {
    if(action.type == "SET_HARVEST_YEAR"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default getRecordHarvestYearReducer;
