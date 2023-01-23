import { useEffect, useReducer, useRef, useState } from "react";
import { getPostByPostID, changePublishPostStatus } from "../api-calls/axios-requests";
import { getIDfromParams } from "../models/URLparams";
import { encode } from "base64-arraybuffer"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";
import ConfirmPopup from "../components/ConfirmPopup";

import ParagraphInput from "../components/ParagraphInput";
import { act } from "react-dom/test-utils";

export default function EditPost() {

    const postTitle = useRef()

    const [postState , setPostState] = 
        useReducer(reduceState , {bodyArray: [] , published: false , loading: true , postTitle: ''})

    function reduceState(state , action) {
        if(action.initialize)
            return {
                bodyArray: mapIDtoArray(action.body),
                published: action.published,
                loading: false,
                postTitle: action.postTitle
            }
        else if(action.changeBodyArray) 
            return {...state,
                bodyArray: action.body,
            }
        else if(action.setPublished)
            return {...state,
                published: !state.published
            }
    }

    useEffect(() => {
        getPostByPostID(getIDfromParams())
            .then(async result => {
                if(result) {
                    setPostState({body: result.body_array, published: result.published, loading: false, 
                        postTitle: result.title , initialize: true})
                }
            })
    }, [] )
    function mapIDtoArray(array) {
        return array.map((element,index) =>
            {return {...element, id: Math.random()}})
    }
    function handleTextChange(value , index) {
        let newArray = [...postState.bodyArray]
        let oldElement = {...newArray[index]}
        oldElement.text = value
        newArray[index] = oldElement
        setPostState({changeBodyArray: true , body: newArray})
    }

    function deleteSection(index) {
        setPostState({body: postState.bodyArray.filter((value , i) => {return index !== i}),
            changeBodyArray:true})
    }

    function mapArray(element , index) {
        if(element.type === 'image') {
            return (
                <section className="post-section" key={element.id}>
                    <div className="img-wrapper">
                    {(element.url) ? 
                        <img className="uploaded-image" src={element.url} key={index} alt='hi' /> 
                        : 
                        <img className="uploaded-image" alt=''
                            src={`data:image/jpeg;base64, ${encode(element.file.Body.data)}`}/> 
                    }
                        <textarea className="edit-image-caption" defaultValue={element.text}
                            onChange={(event => { handleTextChange(event.target.value , index) } )}/>
                    </div>

                    <button className="delete-section-button" id='delete-img-section'
                        onClick={ () => {deleteSection(index)} }>Delete</button>
                </section>
            )
        }
        else if(element.type === 'text') {
            return (
                <section className="post-section" key={element.id}>
                    <ParagraphInput className="post-text" defaultValue={element.text} 
                        index={index} onChange={(value) => handleTextChange(value,index)}/>
                    <button className="delete-section-button"
                        onClick={() => {deleteSection(index)}}>Delete</button>
                </section>
            )
        }
    }
    if(postState.loading) {
        return  <div className="loading-container">
                    <div className="loader"/>
                </div>
    }
    else {
    return (
        // TODO: Save post title
            <div className="column-container">
                <div className="post-content">
                    <h1 className="post-title">Post Editor</h1>
                    <header className="edit-post-header-wrapper">
                            <div className="post-title">Post Title:</div>
                            <input className="input-post-title" defaultValue={postState.postTitle}
                                ref={postTitle} />
                            <ConfirmPopup ID='pushTitle' bgID='pushTitlebg'
                                handleTask={() => console.log('worked')}
                                buttonClass='header-button'
                                buttonText='Save Title'
                                confirmText='Are you sure you want to save the title?'/>
                        {postState.published ? 
                            <>
                                <label className="publish-label">This post IS visible to other users</label> 
                                <button onClick={() => {changePublishPostStatus(getIDfromParams())
                                    setPostState({setPublished: true})}}
                                    className='header-button'>
                                    Make this post private?</button> 
                            </> 
                            : 
                            <>
                                <label className="publish-label">This post is NOT visible to other users</label>
                                <button onClick={() => {changePublishPostStatus(getIDfromParams());
                                    setPostState({setPublished: true})}}
                                    className='header-button'>
                                    Publish this post?</button> 
                            </>
                        }

                    </header>
                    <div className="section-container">{postState.bodyArray?.map(mapArray)}</div>

                    <CreateSection postArray={postState.bodyArray} setPostArray={setPostState}/>
                    <SavePost state={'update'} bodyArray={postState.bodyArray} postID={getIDfromParams()} 
                            title={postTitle?.current}/>
                </div>
            </div>
        )
    }
}