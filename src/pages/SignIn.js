import {useRef} from "react"
import {signIn} from '../api-calls/axios-requests.js'
import { goTo } from "../models/Navigation.js"
import {useUserContext} from '../models/UserContext'


export default function SignIn() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { setContext } = useUserContext()

    async function handleSignIn() {
        if(await signIn(emailRef.current.value , passwordRef.current.value , setContext)) {
            goTo('/')
            window.location.reload(true)
        }

    }

    return (
        <div className="signin-container">
            <section className="signin-outdent">
                <h2 className="signin-header">Welcome to the Porter Travel Blog!</h2>

                <label className="signin-label">Email:</label>
                <input className="signin-input" ref={emailRef}/>

                <label className="signin-label">Password:</label>
                <input className="signin-input" type='password' ref={passwordRef}/>

                <button className='signin-button' onClick={ () => { 
                    handleSignIn() }}>Log In </button>
            </section>
        </div>
    )
}