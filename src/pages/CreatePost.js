import React, {useRef, useState } from "react"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";
import { getIDfromParams } from "../models/URLparams";

export default function CreatePost() {

    // TODO: see if you can set text without rerender

    const [postArray, setPostArray]  = useState([]);
    const postTitle                  = useRef('')
    const [published , setPublished] = useState(false) 

    function handleTextChange(event , index) {
        let newArray = [...postArray]
        let oldElement = {...newArray[index]}
        oldElement.text = event.target.value
        newArray[index] = oldElement
        setPostArray(newArray)
    }

    function deleteSection(index) {
        let newArray = [...postArray]
        newArray.splice(index , 1)
        setPostArray(newArray)
    }

    function mapArray(element , index) {
        if(element.type === 'image') {
            return (
                <section className="post-section" key={element.id}>
                    <div className="img-wrapper">
                        <img className="uploaded-image" src={element.url} key={index} alt='hi' />
                        <textarea className="edit-image-caption" 
                            onChange={(event => {handleTextChange(event , index) } )}/>
                    </div>
                    <button className="delete-section-button" id='delete-img-section'
                        onClick={ e => {deleteSection(index)} }>Delete</button>
                    
                </section>
            )
        }
        else if(element.type === 'text') {
            return (
                <section className="post-section" key={element.id}>
                    <textarea className="post-text" onChange={(event) => {handleTextChange(event , index)}}/>
                    <button className="delete-section-button" 
                        onClick={event => {deleteSection(index)}}>Delete</button>
                </section>
            )
        }
    }

    return (
        <div className="column-container">
            <div className="post-content">
                <h1 className="post-title">Create Post</h1>
                <header className="create-post-header-wrapper">
                    <div className="post-title">Post Title:</div>
                    <input className="input-post-title" 
                        ref={postTitle}/>

                    {published ? 
                        <>
                            <label>This post WILL be visible to other users. </label> 
                            <button style={{fontSize: 'x-large'}} onClick={() => setPublished(current => !current)}>
                                Make this post private upon save? </button> 
                        </> 
                        : 
                        <>
                            <label>This post will NOT visible to other users. </label>
                            <button style={{fontSize: 'x-large'}} onClick={() => setPublished(current => !current)}>
                                Publish this post upon save?</button> 
                        </>
                    }
                </header>
                <div className="section-container">
                    {postArray.map(mapArray)}
                </div>

                <CreateSection postArray={postArray} setPostArray={setPostArray}/>
                <SavePost state={'new'} bodyArray={postArray} blogID={getIDfromParams()} 
                    title={postTitle?.current.value} published={published}/>
            </div>
        </div>
    )
} 