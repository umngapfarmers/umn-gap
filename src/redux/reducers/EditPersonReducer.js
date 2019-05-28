const setEditPerson = (state =[], action) => {
    if (action.type == "SET_EDIT_PERSON") {
        return action.payload
    }

    return state
};

// user will be on the redux state at:
// state.user
export default setEditPerson;