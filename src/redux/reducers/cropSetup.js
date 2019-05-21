import { combineReducers } from 'redux';

const cropSetup = (state = [], action) => {
    switch (action.type) {
        case 'SET_CROP_SOURCE':
            return action.payload;
        default:
            return state;
    }
}

const fieldSetup = (state = [], action) => {
    switch (action.type) {
        case 'SET_FIELD_SOURCE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    cropSetup,
    fieldSetup,
});