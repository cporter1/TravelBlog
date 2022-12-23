import { useEffect, useState } from "react"
import { getPostsByBlogID } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"

export default function BlogView() {
    
    const [postsArray , setPostsArray] = useState([])

    useEffect(() => {
        getPostsByBlogID(getIDfromParams())
    })


    return (
        <div>
            <button onClick={()=>{goTo(`/createpost?${getIDfromParams()}`)}}>
                Create Post</button>
        </div>
    )
}