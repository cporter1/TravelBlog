import {useRef} from "react"
import {logIn} from '../api-calls/axios-requests.js'
import {useUserContext} from '../models/UserContext'

export default function SignIn() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { setContextEmail , setAccountRole , setContextUsernname } = useUserContext()

    return (
        <div className="login-container">
            <label>Email:</label>
            <input ref={emailRef}/>

            <label>Password:</label>
            <input ref={passwordRef}/>

            <button className='delete-section-button' onClick={ () => { 
                logIn(emailRef.current.value , passwordRef.current.value , setContextEmail , setAccountRole , setContextUsernname) }}/>
        </div>
    )
}