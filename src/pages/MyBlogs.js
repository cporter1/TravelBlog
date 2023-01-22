import { useEffect , useReducer, useState } from "react"
import { getMyBlogs } from "../api-calls/axios-requests"
import { useUserContext } from "../models/UserContext"
import BlogBanner from "../components/BlogBanner"


export default function MyBlogs() {

    const {username} = useUserContext()

    const [blogsState , setBlogsState] =
        useReducer(stateReducer , {blogsArray: [], loading: true})

    function stateReducer(state , action) {
        return {
            blogsArray: action.blogsArray,
            loading: false
        }
    }

    useEffect(() => {
        getMyBlogs(username)
            .then(async result => {
                setBlogsState({blogsArray: result})
                // setBlogArray( result )
            })
    },[])
    if(blogsState.loading) {
        return (
            <div className="loading-container">
                <div className="loader"/>
            </div>
        )}
    else {
        return (
            <div className="column-container">
                <h1 className="title-header">My Blogs</h1>
                <hr className="hor-divider"/>
                <div className="blogs-wrapper">
                    {blogsState.blogsArray.map((element , index) => {
                        return (
                            <BlogBanner title={element.title} author={element.author} 
                                lastUpdated={element.last_updated} 
                                key={index} id={element.id}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}