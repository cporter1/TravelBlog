import { useEffect, useReducer} from "react"
import { getPostsByBlogID , getBlogByBlogID ,
         saveBlogTravelDates, saveBlogTitle ,
         deletePost } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"
import { encode } from "base64-arraybuffer"
import { useUserContext } from "../models/UserContext"
import { timeAgo } from "../models/TimeFormat"
import ConfirmPopup from "../components/ConfirmPopup"

export default function BlogView() {

    const {username} = useUserContext()
    const [bodyState , setContent] = 
        useReducer(reduceFetches , {blog : {} , postArray: [], loading: true, blogOwner: false})

    function reduceFetches(state , action) {
            if(action.initialize)
                return {
                    postArray : action.posts,
                    blog      : action.blog,
                    blogOwner : username === action.blog?.author,
                    loading : false
                }
            else if(action.deletePost)
                return {...state,
                    postArray: action.posts
                }
        }

    useEffect(() => {
        if(bodyState.blog.author) return;
        Promise.all([ getPostsByBlogID( getIDfromParams() ) ,
            getBlogByBlogID( getIDfromParams() ) ])
            .then(async result => {
                setContent({blog: result[1] , 
                    posts: (result[0] ? result[0] : []) , initialize: true });      
            })
    },[])

    function handleDeletePost(postID , index) {
        deletePost(postID)
        setContent( {deletePost: true , posts: deletePostState(index)} )
    }

    function deletePostState(index) {
        let newArray = [...bodyState.postArray]
        newArray.splice(index , 1)
        return newArray
    }

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
                    {(bodyState.blogOwner)?
                        <h6 style={{margin: '5px 0px'}}>{element.published? 'Public Post' : 'Private Post'}</h6>
                        : null
                    }
                    {bodyState.blogOwner ? 
                        <div className="edit-delete-post-wrapper">
                            <button className="edit-post-button" 
                                onClick={() => goTo(`/editpost/?${element.id}`)}>
                                Edit Post</button> 
                            <ConfirmPopup ID='deletePost' bgID='pgDeletePost' 
                                buttonClass='delete-post-button' 
                                buttonText='Delete Post' 
                                handleTask={() => handleDeletePost(element.id , index)}
                                confirmText='Are you sure you want to delete this post?'
                                />
                        </div>
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
                <section style={{whiteSpace: 'pre-wrap'}} className="body-text" key={index}>
                    {paragraphsToArray(element.text).map(paragraphMap)}
                </section>
            )
        } else if(element['type'] === 'image') {
            return (
                <section className="img-wrapper" style={{marginBottom: '2%'}} key={index}>
                    <img alt='' className="uploaded-image"
                        src={`data:image/jpeg;base64, ${encode(element.file.Body.data)}`}/>
                        <div className="edit-image-caption">{element.text}</div>
                </section>
            )
        } else {console.error('function postSectionMap: invalid array')}
    }
    function paragraphsToArray(text) {
        let output = []
        for(let i = 0; i < text.length; i++) {

            if((text[i] === '<') && (text[i+1] === 'p') && (text[i+2] === '>')) { //found starting tag

                for(let j = i+3; j < text.length; j++) { // looking for end tag

                    if((text[j] === '<') && (text[j+1] === '/') && (text[j+2] === 'p') && 
                        (text[j+3] === '>')) {
                        output.push(text.substring(i+3 , j))
                        i= j+4
                        }
                }
            }
        }
        return output
    }
    function paragraphMap(element , index) {
        if(element=== '<br>') 
            return (
                <br/>
            )
        else {  
            return(
                <p id={index}>
                    {element}
                </p>
            )  
        
        }
    }


    if(bodyState.loading) {
        return  <div className="loading-container">
                    <div className="loader"/>
                </div>
    }
    else if(bodyState.blogOwner) { // this is your blog
        return (
            <div className="column-container">
                <header className="blog-header-container">
                    <div className="edit-title-wrapper">
                        <label className="title-label">Title: </label>
                        <input className="input-title" type='text' 
                            defaultValue={bodyState.blog?.title}
                            onChange={(e) => bodyState.blog.title = e.target.value}/>
                        <ConfirmPopup ID='title' bgID='bgtitle' handleTask={submitNewTitle}
                            buttonClass='new'
                            buttonText='Save Title' 
                            confirmText='Are you sure you want to save the title?'/>
                    </div>
                    <div className="edit-traveldates-wrapper">
                        <label className="title-label">Travel Dates: </label>
                        <input className="input-title" type='text'
                            defaultValue={bodyState.blog?.travel_dates}
                            onChange={(e) => bodyState.blog.travel_dates = e.target.value}/>
                        <ConfirmPopup ID='dates' bgID="bgDates" handleTask={submitNewTravelDates}
                            buttonText='Save Travel Dates' 
                            confirmText='Are you sure you want to save the travel dates?'/>
                    </div>
                    <label className="updated-label">{timeAgo(bodyState.blog.last_updated)}</label>
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
                    <h1 style={{textAlign:'center'}}>{bodyState.blog?.title}</h1>
                    <h3 style={{textAlign:'center'}}>By {bodyState.blog?.author}</h3>
                    <div className="blog-time-wrapper">
                        <h5 style={{textAlign:'right'}}>{timeAgo(bodyState.blog?.last_updated)}</h5>
                        <h5>-</h5>
                        <h5 style={{textAlign:'left'}}>Travel Dates: {bodyState.blog?.travel_dates} </h5>
                    </div>
                </header>
                <article>{bodyState.postArray?.map(postMap)}</article>
            </div>
        )
    }
}