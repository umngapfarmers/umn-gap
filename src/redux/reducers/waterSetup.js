import { combineReducers } from 'redux';

const waterSource = (state = [], action) => {
    switch (action.type) {
        case 'SET_WATER_SOURCE':
            return action.payload;
        default:
            return state;
    }
}

const waterLabel = (state = [], action) => {
    switch (action.type) {
        case 'SET_WATER_LABEL':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    waterSource,
    waterLabel,
});