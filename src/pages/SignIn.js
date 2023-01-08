import {useRef} from "react"
import {signIn} from '../api-calls/axios-requests.js'
import { goTo } from "../models/Navigation.js"
import {useUserContext} from '../models/UserContext'


export default function SignIn() {

    const usernameRef = useRef()
    const passwordRef = useRef()

    const { setContext } = useUserContext()

    async function handleSignIn() {
        if(await signIn(usernameRef.current.value , passwordRef.current.value , setContext)) {
            goTo('/')
            window.location.reload(true)
        }

    }

    return (
        <div className="login-container">
            <label>Username:</label>
            <input ref={usernameRef}/>

            <label>Password:</label>
            <input type='password' ref={passwordRef}/>

            <button className='delete-section-button' onClick={ () => { 
                handleSignIn() }}>Log In </button>
        </div>
    )
}