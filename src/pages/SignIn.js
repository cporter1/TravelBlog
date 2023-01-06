import {useRef} from "react"
import {signIn} from '../api-calls/axios-requests.js'
import {useUserContext} from '../models/UserContext'


export default function SignIn() {

    const usernameRef = useRef()
    const passwordRef = useRef()

    const { setContext } = useUserContext()

    // TODO: put navigation logic on button press here

    return (
        <div className="login-container">
            <label>Username:</label>
            <input ref={usernameRef}/>

            <label>Password:</label>
            <input type='password' ref={passwordRef}/>

            <button className='delete-section-button' onClick={ () => { 
                signIn(usernameRef.current.value , passwordRef.current.value , setContext) }}>Log In </button>
        </div>
    )
}