import { useEffect, useReducer} from "react"
import { getPostsByBlogID , getBlogByBlogID ,
         saveBlogTravelDates, saveBlogTitle } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"
import { encode } from "base64-arraybuffer"
import { useUserContext } from "../models/UserContext"
import { timeAgo } from "../models/TimeFormat"


export default function BlogView() {

    const {username} = useUserContext()
    const [bodyState , setContent] = 
        useReducer(reduceFetches , {blog : {} , postArray: [], loading: true})

    function reduceFetches(state , action) {
            return {
                postArray : action.posts,
                blog      : action.blog,
                blogOwner : username === action.blog.author,
                loading : false
            }
        }

    useEffect(() => {
        if(bodyState.blog.author) return;
        Promise.all([ getPostsByBlogID( getIDfromParams() ) ,
            getBlogByBlogID( getIDfromParams() ) ])
            .then(async result => {
                setContent({blog: result[1] , posts: (result[0] ? result[0] : []) });      
            })
    },[])


    function submitNewTitle() {
        saveBlogTitle(bodyState.blog.title , bodyState.blog.id)
    }
    function submitNewTravelDates() {
        saveBlogTravelDates(bodyState.blog.travel_dates , bodyState.blog.id)
    }

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

    if(bodyState.loading) {
        return <div>loading...</div>
    }
    else if(bodyState.blogOwner) { // this is your blog
        return (
            <div>
                <h1>Your Blog</h1><br/>
                <label>Title: </label>
                <input type='text' defaultValue={bodyState.blog?.title}
                    onChange={(e) => bodyState.blog.title = e.target.value}/>
                <button onClick={() => submitNewTitle()} >Save Title</button><br/>

                <label>Last Update: {timeAgo(bodyState.blog.last_updated)}</label><br/>

                <label>Travel Dates: </label>
                <input type='text' defaultValue={bodyState.blog?.travel_dates}
                    onChange={(e) => bodyState.blog.travel_dates = e.target.value}/>
                <button onClick={() => submitNewTravelDates()}>
                    Save Travel Dates</button> <br/><br/>
            
                <button onClick={()=>{goTo(`/createpost/?${getIDfromParams()}`)}}>
                    Create Post</button> <br/><br/>

                {bodyState.postArray?.map(postMap)}
            </div>
        )
    }
    else { // not your blog
        return (
            <div>
                <h1>{bodyState.blog?.author}'s Blog</h1><br/>
                <h2>{bodyState.blog?.title}</h2><br/>
                <h2>Last Update: {bodyState.blog?.last_updated}</h2>

                <h2>Travel Dates: {bodyState.blog?.travel_dates} </h2> <br/><br/>

                {bodyState.postArray?.map(postMap)}
            </div>
        )
    }
}