const setEditUser = (state = [], action) => {
    if (action.type == "SET_EDIT_USER") {
        return action.payload
    }

    return state
};

// user will be on the redux state at:
// state.user
export default setEditUser;