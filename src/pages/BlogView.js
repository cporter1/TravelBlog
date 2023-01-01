import { useEffect, useState } from "react"
import { getPostsByBlogID } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"

export default function BlogView() {
    
    const [postsArray , setPostsArray] = useState([])

    useEffect(() => {
        getPostsByBlogID(getIDfromParams())
            .then(async result => {
                setPostsArray(result)
            })
    },[])


    function PostMap(element , index) {
        return (
            <section key={index}>
                <div>{element.title} </div>
                <div>{dateHandler(element.time_posted)}</div>
                <div>blog_array: {element.blog_array}</div>
                <br/>
            </section>
        )

    }


    return (
        <div>
            <button onClick={()=>{goTo(`/createpost/?${getIDfromParams()}`)}}>
                Create Post</button>

            <section>
                {postsArray.map(PostMap)}
            </section>
        </div>
    )
}