import {useRef} from "react"
import { createAccount } from "../api-calls/axios-requests"

export default function CreateAccount() {
    
    const roleRef = useRef()
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()

    return (
        <div className="login-container">
            <h1>CreateAccount</h1>

            <label>Role:</label>
            <input ref={roleRef}/>

            <label>Email:</label>
            <input ref={emailRef}/>

            <label>Username:</label>
            <input ref={usernameRef}/>

            <label>Password:</label>
            <input ref={passwordRef}/>

            <button className='delete-section-button' onClick={ () => {
                createAccount(usernameRef.current.value , passwordRef.current.value , emailRef.current.value , roleRef.current.value)
            }}>Create Account</button>
        </div>
    )
}