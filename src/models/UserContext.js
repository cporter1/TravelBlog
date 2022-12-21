import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext()

export function useUserContext() {
    return useContext(AppContext)
}

export function logInContext(email , username , role) {

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('username' , username)
    sessionStorage.setItem('role', role)
}

export function removeSession() {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('role')
}


export default function UserContext({ children }) {
    const [username , setContextUsername] = useState(sessionStorage.getItem('username'))
    const [email , setContextEmail] = useState(sessionStorage.getItem('email'))
    const [accRole , setAccountRole] = useState(sessionStorage.getItem('role'))

    function setContext(email , username , role) {
        setContextEmail(email)
        setContextUsername(username)
        setAccountRole(role)
    }

    useEffect(() => {
        setContextEmail(sessionStorage.getItem('email'))
        setContextUsername(sessionStorage.getItem('username'))
        setAccountRole(sessionStorage.getItem('role'))
    },[email])

    return (
        <AppContext.Provider value={{username , email , accRole ,
            setContext}}>
                {children}
        </AppContext.Provider>
    )
}