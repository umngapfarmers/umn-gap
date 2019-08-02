import { combineReducers } from 'redux';

const otherEquipment = (state = [], action) => {
    switch (action.type) {
        case 'SET_OTHER_EQUIPMENT':            
            return action.payload;
        default:
            return state;
    }
}

const tool = (state = [], action) => {
    switch (action.type){
        case 'SET_TOOL':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    otherEquipment,
    tool,
});