import { useRef } from "react"
import { createBlog } from "../api-calls/axios-requests"
import { useUserContext } from "../models/UserContext"

export default function CreateBlog() {

    const titleRef = useRef()
    const usernameRef = useRef()

    return (
        <div>
            <label>Title: </label>
            <input type='text' ref={titleRef}/>
            <label>User: </label>
            <input type='text' ref={usernameRef}/>

            <button onClick={() => {createBlog(titleRef.current.value , usernameRef.current.value )}}>
                Create Blog</button>
        </div>
    )
}