import { combineReducers } from 'redux';

const cropSetup = (state = [], action) => {
    switch (action.type) {
        case 'SET_CROP_SOURCE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    cropSetup,
});