import { useEffect, useRef, useState } from "react"
import { getPostsByBlogID , getBlogByBlogID ,
         saveBlogTravelDates, saveBlogTitle } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"
import { encode } from "base64-arraybuffer"
import { useUserContext } from "../models/UserContext"


export default function BlogView() {

    const {username} = useUserContext()
    
    const [postsArray , setPostsArray] = useState([])
    const blog                         = useRef()
    const [blogOwner , setBlogOwner]   = useState(username === blog.author)
    const [loading , setLoading]       = useState(true)

    useEffect(() => {
        getPostsByBlogID(getIDfromParams())
            .then(async result => {
                if(result) setPostsArray(result);
            })
        getBlogByBlogID(getIDfromParams())
            .then(async result => {
                if(result) {
                    blog.current = result
                    if(blog.current && postsArray) setLoading(false);
                    if(username === blog.current.author) 
                        setBlogOwner(true)
                }
            })
    },[])

    function submitNewTitle() {
        saveBlogTitle(blog.current.title , blog.current.id)
    }
    function submitNewTravelDates() {
        saveBlogTravelDates(blog.current.travel_dates , blog.current.id)
    }

    function postMap(element , index) {
        return (
            <section key={element.id}>
                <div>{element.title} </div>
                <div>{dateHandler(element.time_posted)}</div>
                <div>{element.body_array?.map(bodyMap)}</div>

                {blogOwner ? 
                    <button onClick={() => goTo(`/editpost/?${element.id}`)}>
                        Edit Post</button> 
                    : null}
                <br/><br/>
            </section>
        )

    }
    function bodyMap(element , index) {
        if(element['type'] === 'text') { // textbox section
            return (
                <section key={index}>
                    {element.text}
                </section>
            )
        } else if(element['type'] === 'image') {
            return (
                <section key={index}>
                    <img alt='' className="uploaded-images"
                        src={`data:image/jpeg;base64, ${encode(element.file.Body.data)}`}/>
                        <div>{element.text}</div>
                </section>
            )
        } else {console.error('function postSectionMap: invalid array')}
    }

    if(loading) {
        return <div>Loading...</div>
    }
    else if(blogOwner) { // this is your blog
        return (
            <div>
                <h1>{blog.current.author}'s Blog</h1><br/>
                <label>Title: </label>
                <input type='text' defaultValue={blog.current.title}
                    onChange={(e) => blog.current.title = e.target.value}/>
                <button onClick={() => submitNewTitle()} >Save Title</button><br/>

                <label>Last Update: {blog.current.last_updated}</label><br/>

                <label>Travel Dates: </label>
                <input type='text' defaultValue={blog.current.travel_dates}
                    onChange={(e) => blog.current.travel_dates = e.target.value}/>
                <button onClick={() => submitNewTravelDates()}>
                    Save Travel Dates</button> <br/><br/>
            
                <button onClick={()=>{goTo(`/createpost/?${getIDfromParams()}`)}}>
                Create Post</button> <br/><br/>

                {postsArray?.map(postMap)}
            </div>
        )
    }
    else { // not your blog
        return (
            <div>
                <h1>{blog.current.author}'s Blog</h1><br/>
                <h2>{blog.current.title}</h2><br/>
                <h2>Last Update: {blog.current.last_updated}</h2>

                <h2>Travel Dates: {blog.current.travel_dates} </h2> <br/><br/>

                {postsArray?.map(postMap)}
            </div>
        )
    }
}