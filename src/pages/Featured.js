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
                <section style={{whiteSpace: 'pre-wrap'}} className="body-text" key={index}>
                    {paragraphsToArray(element.text).map(paragraphMap)}
                </section>
            )
        } else if(element['type'] === 'image') {
            // let image = new Image;
            // image.src = 'data:image/*;base64' + encode(element.file.Body.data)
            // image.crossOrigin = 'Anonymous'
            return (
                <div className="img-wrapper" style={{marginBottom: '2%'}} key={index}>
                    <img alt='' className="uploaded-image"
                        src={`data:image/*;base64,${encode(element.file.Body.data)}`}/>
                        <div>{element.text}</div>
                </div>
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
        if(element === '<br>') 
            return (
                <br/>
            )
        else {  
            return (<p id={index}>
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
    else { 
        return (
            <div className="column-container">
                <header className="blog-header-container">
                    <h1 style={{textAlign:'center'}}>{bodyState.blog?.title}</h1>
                    <h3 style={{textAlign:'center'}}>By {bodyState.blog?.author}</h3>

                    <div className="blog-time-wrapper">
                        <h5>{timeAgo(bodyState.blog?.last_updated)}</h5>
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