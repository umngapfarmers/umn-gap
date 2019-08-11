const recordEquipmentOther = (state = [], action) => {
    if(action.type == "SET_RECORD_EQUIPMENT_OTHER"){
      return action.payload
    }
  return state
};

// user will be on the redux state at:
// state.user
export default recordEquipmentOther;
