import { combineReducers } from 'redux';

const waterSetup = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    movieReducer,
});