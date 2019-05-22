const workerReducer = (state = [], action) => {
    console.log('this is worker reducer');

    switch (action.type) {
        case "SET_WORKER":
            console.log("yayh", action.payload);
            return action.payload;
        case "SET_EMPLOYEE":
            console.log("yayh", action.payload);
            return action.payload;

        default:
            return state;
    }
};
export default workerReducer;