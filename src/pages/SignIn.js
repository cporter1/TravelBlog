import {useRef} from "react"
import {logIn} from '../api-calls/axios-requests.js'
import {useUserContext} from '../models/UserContext'


export default function SignIn() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { setContext } = useUserContext()

    // TODO: put navigation logic on button press here

    return (
        <div className="login-container">
            <label>Email:</label>
            <input ref={emailRef}/>

            <label>Password:</label>
            <input type='password' ref={passwordRef}/>

            <button className='delete-section-button' onClick={ () => { 
                logIn(emailRef.current.value , passwordRef.current.value , setContext) }}>Log In </button>
        </div>
    )
}