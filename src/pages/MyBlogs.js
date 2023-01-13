import { useEffect , useState } from "react"
import { getMyBlogs } from "../api-calls/axios-requests"
import { useUserContext } from "../models/UserContext"
import BlogBanner from "../components/BlogBanner"


export default function MyBlogs() {

    const {username} = useUserContext()

    const [blogArray , setBlogArray] = useState([])

    useEffect(() => {
        getMyBlogs(username)
            .then(async result => {
                setBlogArray( result )
            })
    },[])

    return (
        <div className="column-container">
            <h1>My Blogs</h1>
            <div className="blogs-wrapper">
                {blogArray.map((element , index) => {
                    return (
                        <BlogBanner title={element.title} author={element.author} 
                            lastUpdated={element.last_updated} key={index} id={element.id}/>
                    )
                })}
            </div>
        </div>
    )
}