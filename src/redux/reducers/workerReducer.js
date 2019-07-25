const workerReducer = (state = [], action) => {
    

    switch (action.type) {
        case "SET_WORKER":
            return action.payload;
        case "SET_EMPLOYEE":
            return action.payload;

        default:
            return state;
    }
};
export default workerReducer;