import { useEffect, useState } from "react"
import { getAllBlogsAndPosts } from "../api-calls/axios-requests"
import BlogBanner from "../components/BlogBanner";
import { parseBlogsFromPosts } from "../models/ParseBlog";

export default function AllBlogs() {

    const [loading , setLoading] = useState(true);
    const [blogArray , setBlogArray] = useState([]);

    useEffect( () => {
        getAllBlogsAndPosts()
            .then(async result => {
                if(result != null) {
                    setBlogArray(parseBlogsFromPosts(result)[0])
                }
            })
    },[])

    return (
        <div>
            {blogArray.map((element , index) => {
                return (
                    <BlogBanner title={element.title} author={element.author} 
                        lastUpdate={element.last_update} key={index} id={element.id}/>
                )
            })}
        </div>
    )
}