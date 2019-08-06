const getEquipmentOther = (state = [], action) => {
    if(action.type == "SET_EQUIPMENT_OTHER_LOG"){
      return action.payload
    }
  
  return state
};

// user will be on the redux state at:
// state.user
export default getEquipmentOther;
