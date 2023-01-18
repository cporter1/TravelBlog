import { useEffect, useReducer} from "react"
import { getFeaturedBlogAndPosts} from "../api-calls/axios-requests"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"
import { encode } from "base64-arraybuffer"
import { timeAgo } from "../models/TimeFormat"

export default function Home() {

    const [bodyState , setContent] = 
        useReducer(reduceState , {blog : {} , posts: [], loading: true})

    function reduceState(state , action) {
            return {
                blog      : action.blog,
                posts     : action.posts,
                loading   : false
            }
        }

    useEffect(() => {
        getFeaturedBlogAndPosts()
            .then(async result => {
                setContent({blog: result[0] , posts: result[1]})
            })
    },[])

    function postMap(element , index) {
        return (
            <section className="post" key={element.id}>
                <header className="post-header">
                    <h3>{element.title} </h3>
                    <h6>Posted {dateHandler(element.time_posted)}</h6>
                </header>
                <section className="body-section">
                    {element.body_array?.map(bodyMap)}
                </section>

                {bodyState.blogOwner ? 
                    <button onClick={() => goTo(`/editpost/?${element.id}`)}>
                        Edit Post</button> 
                    : null}
            </section>
        )

    }
    function bodyMap(element , index) {
        if(element['type'] === 'text') { // textbox section
            return (
                <div className="body-text" key={index}>
                    {element.text}
                </div>
            )
        } else if(element['type'] === 'image') {
            return (
                <div className="img-wrapper" key={index}>
                    <img alt='' className="uploaded-image"
                        src={`data:image/jpeg;base64,${encode(element.file.Body.data)}`}/>
                        <div>{element.text}</div>
                </div>
            )
        } else {console.error('function postSectionMap: invalid array')}
    }

    if(bodyState.loading) {return <div>loading...</div>;}
    else { 
        return (
            <div className="column-container">
                <header className="blog-header-container">
                    <h1>{bodyState.blog?.title}</h1>
                    <h3>By {bodyState.blog?.author}</h3>

                    <div className="blog-time-wrapper">
                        <h5>Updated {timeAgo(bodyState.blog?.last_updated)}</h5>
                        <h5>-</h5>
                        <h5>Travel Dates: {bodyState.blog?.travel_dates} </h5>
                    </div>
                </header>

                <article>
                    {bodyState.posts?.map(postMap)}
                </article>
            </div>
        )
    }
}