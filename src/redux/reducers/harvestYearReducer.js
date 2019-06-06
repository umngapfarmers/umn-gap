const harvestYearReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_HARVEST_YEAR":
            return action.payload;
        default:
            return state;
    }
};
export default harvestYearReducer;
