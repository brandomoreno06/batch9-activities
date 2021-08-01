const initialState = {
    user: null,
}



const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {...state, user: action.user}
        case "LOGOUT_USER":
            return {...state, user: null}
        default: 
        return state;   
    }
}


export { initialState };
export default reducer;