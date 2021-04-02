import React, { createContext, useReducer} from 'react'
import AppReducer from './AppReducer'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [transactions, dispatch] = useReducer(AppReducer, []);

    return (<GlobalContext.Provider value={{
        transactions,
        dispatch
    }}>
        {children}
    </GlobalContext.Provider>);
}