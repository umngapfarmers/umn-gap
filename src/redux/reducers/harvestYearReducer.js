const harvestYearReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_HARVEST_YEAR":
            console.log("yayh", action.payload);
            return action.payload;
        default:
            return state;
    }
};
export default harvestYearReducer;
