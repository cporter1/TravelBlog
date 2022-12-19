import { useState } from "react"
import {logIn} from '../api-calls/axios-requests.js'
import {useUserContext} from '../models/UserContext'

export default function SignIn() {

    const [email , setEmail]       = useState('')
    const [password , setPassword] = useState('')

    const { setContextEmail , setAccountRole } = useUserContext()

    return (
        <div className="login-container">
            <label>Email:</label>
            <input onChange={(e) => { setEmail(e.target.value)}}/>

            <label>Password:</label>
            <input onChange={(e) => { setPassword(e.target.value)}}/>

            <button className='delete-section-button' onClick={ () => { 
                logIn(email , password , setContextEmail , setAccountRole) }}/>
        </div>
    )
}