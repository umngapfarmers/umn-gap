// stores current manure per harvest year
const setupManureReducer = (state = [], action) => {
    if (action.type === 'SET_COMPOST_SETUP') {
        return action.payload
    }
    return state
};


export default setupManureReducer;
