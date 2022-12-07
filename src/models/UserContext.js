import React, { useContext, useState } from "react";

const AppContext = React.createContext()

export function useUserContext() {
    return useContext(AppContext)
}

export default function UserContext({ children }) {
    const [username , SetContextUsername] = useState('')
    const [email , setContextEmail] = useState('')

    return (
        <AppContext.Provider value={{username , email , SetContextUsername , setContextEmail}}>
                {children}
        </AppContext.Provider>
    )
}