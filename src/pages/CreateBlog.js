import { useRef } from "react"
import { createBlog } from "../api-calls/axios-requests"
import { useUserContext } from "../models/UserContext"

export default function CreateBlog() {

    const titleRef = useRef()

    const {username} = useUserContext()

    return (
        <div>
            <label>Title: </label>
            <input type='text' ref={titleRef}/>
            <button onClick={() => {createBlog(titleRef.current.value , username )}}>
                Create Blog</button>
        </div>
    )
}