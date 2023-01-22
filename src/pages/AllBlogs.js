import { useEffect, useReducer } from "react"
import { getAllBlogs } from "../api-calls/axios-requests"
import BlogBanner from "../components/BlogBanner";

export default function AllBlogs() {

    const [blogsState , setBlogsState] =
        useReducer(stateReducer , {blogsArray: [], loading: true})

    function stateReducer(state , action) {
        return {
            blogsArray: action.blogsArray,
            loading: false
        }
    }

    useEffect( () => {
        getAllBlogs()
            .then(async result => {
                if(result != null) {
                    setBlogsState({blogsArray: result})
                }
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
                <h1 className="title-header">All Blogs</h1>
                <hr className="hor-divider"/>
                <div className="blogs-wrapper">
                    {blogsState.blogsArray.map((element , index) => {
                        return (
                            <BlogBanner title={element.title} author={element.author} 
                                lastUpdated={element.last_updated} key={index} 
                                id={element.id}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}