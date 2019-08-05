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

const vehicle = (state = [], action) => {
    switch (action.type){
        case 'SET_VEHICLE':
            return action.payload;
        default:
            return state;
    }
}

const thermometer = (state = [], action) => {
    switch (action.type) {
        case 'SET_THERMOMETER':
            return action.payload;
        default:
            return state;
    }
}

const firstaid = (state = [], action) => {
    switch (action.type) {
        case 'SET_FIRSTAID':
            return action.payload;
        default:
            return state;
    }
}

const pest = (state = [], action) => {
    switch (action.type) {
        case 'SET_PEST':
            return action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    otherEquipment,
    tool,
    vehicle,
    thermometer,
    firstaid,
    pest,
});