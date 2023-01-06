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
            <section key={element.id}>
                <div>{element.title} </div>
                <div>{dateHandler(element.time_posted)}</div>
                <div>{element.body_array?.map(bodyMap)}</div>

                {bodyState.blogOwner ? 
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

    if(bodyState.loading) {return <div>loading...</div>;}
    else { 
        return (
            <div>
                <h1>{bodyState.blog?.author}'s Blog</h1><br/>
                <h2>{bodyState.blog?.title}</h2><br/>
                <h2>Last Updated: {timeAgo(bodyState.blog?.last_updated)}</h2>

                <h2>Travel Dates: {bodyState.blog?.travel_dates} </h2> <br/><br/>

                {bodyState.posts?.map(postMap)}
            </div>
        )
    }
}