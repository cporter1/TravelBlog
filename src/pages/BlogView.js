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
                blogOwner : username === action.blog?.author,
                loading : false
            }
        }

    useEffect(() => {
        if(bodyState.blog.author) return;
        Promise.all([ getPostsByBlogID( getIDfromParams() ) ,
            getBlogByBlogID( getIDfromParams() ) ])
            .then(async result => {
                setContent({blog: result[1] , 
                    posts: (result[0] ? result[0] : []) });      
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
            <section className="post" key={element.id}>
                <header className="post-header">
                    <h3>{element.title} </h3>
                    <h6>Posted {dateHandler(element.time_posted)}</h6>
                    {bodyState.blogOwner ? 
                        <button onClick={() => goTo(`/editpost/?${element.id}`)}>
                            Edit Post</button> 
                    : null}
                </header>
                <section className="body-section">
                        {element.body_array?.map(bodyMap)}
                    </section>
            </section>
        )

    }
    function bodyMap(element , index) {
        if(element['type'] === 'text') { // textbox section
            return (
                <section className="body-text" key={index}>
                    {element.text}
                </section>
            )
        } else if(element['type'] === 'image') {
            return (
                <section className="img-wrapper" key={index}>
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
            <div className="column-container">
                <header className="blog-header-container">
                    <div className="edit-title-wrapper">
                        <label>Title: </label>
                        <input className="input-title" type='text' 
                            defaultValue={bodyState.blog?.title}
                            onChange={(e) => bodyState.blog.title = e.target.value}/>
                        <button onClick={() => submitNewTitle()} >Save Title</button>
                    </div>
                    <div className="edit-traveldates-wrapper">
                        <label>Travel Dates: </label>
                        <input className="input-title" type='text'
                            defaultValue={bodyState.blog?.travel_dates}
                            onChange={(e) => bodyState.blog.travel_dates = e.target.value}/>
                        <button onClick={() => submitNewTravelDates()}>
                            Save Travel Dates</button>
                    </div>
                    <label>Updated {timeAgo(bodyState.blog.last_updated)}</label>
                    <button className="create-post-button" 
                        onClick={()=>{goTo(`/createpost/?${getIDfromParams()}`)}}>
                        Create Post</button>
                </header>

                {bodyState.postArray?.map(postMap)}
            </div>
        )
    }
    else { // not your blog
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

                <article>{bodyState.postArray?.map(postMap)}</article>
            </div>
        )
    }
}