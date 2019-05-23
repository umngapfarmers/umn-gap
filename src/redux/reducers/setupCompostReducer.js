// stores current compost per harvest year
const setupCompostReducer = (state = '', action) => {
    if (action.type === 'SET_COMPOST_SETUP') {
        return action.payload
    }
    return state
};


export default setupCompostReducer;
