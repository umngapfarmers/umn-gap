import { combineReducers } from "redux";

const setupCoolerReducer = (state = [], action) => {
    if (action.type === 'SET_COOLER_SETUP') {
        return action.payload
    }
    return state
};

const setupBathroomReducer = (state = [], action) => {
    if (action.type === 'SET_BATHROOM_SETUP') {
        return action.payload
    }
    return state
};

export default combineReducers({
setupCoolerReducer,
setupBathroomReducer,
})