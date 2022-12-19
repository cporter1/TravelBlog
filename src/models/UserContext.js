import React, { useContext, useState } from "react";

const AppContext = React.createContext()

export function useUserContext() {
    return useContext(AppContext)
}

export default function UserContext({ children }) {
    const [username , setContextUsername] = useState('')
    const [email , setContextEmail] = useState('')
    const [accRole , setAccountRole] = useState('')

    return (
        <AppContext.Provider value={{username , email , accRole ,
            setContextUsername , setContextEmail , setAccountRole}}>
                {children}
        </AppContext.Provider>
    )
}