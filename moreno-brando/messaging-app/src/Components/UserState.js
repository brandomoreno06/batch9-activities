import React, { createContext, useContext, useReducer} from 'react'

 
 
const UserContext = createContext();

export const UserProvider = ({initialState, reducer, children}) => {
    return(
        <UserContext.Provider value={useReducer(reducer, initialState)} >
            {children}
        </UserContext.Provider>
    )
}

export const useStateValue = () => useContext(UserContext);
