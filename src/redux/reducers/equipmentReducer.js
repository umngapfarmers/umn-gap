import { combineReducers } from 'redux';

const otherEquipment = (state = [], action) => {
    switch (action.type) {
        case 'SET_OTHER_EQUIPMENT':
            // console.log(`Set other equipment reducer`, action.payload);
            
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    otherEquipment,
});