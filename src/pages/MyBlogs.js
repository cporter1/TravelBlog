import { useEffect , useState } from "react"
import Link from "../components/Link"
import { getMyBlogs } from "../api-calls/axios-requests"
import { useUserContext } from "../models/UserContext"
import BlogBanner from "../components/BlogBanner"
import { parseBlogsFromPosts } from "../models/ParseBlog"

export default function MyBlogs() {

    const {username} = useUserContext()

    const [blogArray , setBlogArray] = useState([])

    useEffect(() => {
        getMyBlogs(username)
            .then(async result => {
                setBlogArray( parseBlogsFromPosts(result)[0] )
            })
    })

    return (
        <div className="content-container">
            {blogArray.map((element , index) => {
                return (
                    <BlogBanner title={element.title} author={element.author} 
                    lastUpdate={element.last_update} key={index} id={element.id}/>
                )
            })}
        </div>
    )
}