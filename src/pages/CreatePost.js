import React, {useReducer} from "react"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";
import { getIDfromParams } from "../models/URLparams";
import ParagraphInput from "../components/ParagraphInput";

export default function CreatePost() {

    const [postState , setPostState] =
        useReducer(reduceState , {bodyArray:[] , published: false, postTitle:''})

    function reduceState(state , action) {
        if(action.changeBodyArray)
            return {...state,
                bodyArray: action.body,
            }
        else if(action.setPublished)
            return {...state,
                published: !state.published
        }
        else if(action.setTitle)
            return {...state,
                postTitle: action.postTitle
            }
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
                <>
                <CreateSection postArray={postState.bodyArray} setPostArray={setPostState} index={index}/>
                <section className="post-section" key={element.id}>
                    <div className="img-wrapper">
                        <img className="uploaded-image" src={element.url} key={index} alt='hi' />
                        <textarea className="edit-image-caption" 
                            onChange={(event => {handleTextChange(event , index) } )}/>
                    </div>
                    <button className="delete-section-button" id='delete-img-section'
                        onClick={ e => {deleteSection(index)} }>Delete</button>
                    
                </section>
                </>
            )
        }
        else if(element.type === 'text') {
            return (
                <>
                <CreateSection postArray={postState.bodyArray} setPostArray={setPostState} index={index}/>
                <section className="post-section" key={element.id}>
                    <ParagraphInput className="post-text" defaultValue={element.text} 
                        index={index} onChange={handleTextChange}/>
                    <button className="delete-section-button" 
                        onClick={event => {deleteSection(index)}}>Delete</button>
                </section>
                </>
            )
        }
    }

    return (
        <div className="column-container">
            <div className="post-content">
                <h1 className="post-title">Create Post</h1>
                <header className="create-post-header-wrapper">
                    <div className="publish-label">Post Title:</div>
                    <input className="input-post-title" 
                        onChange={(event) => setPostState({setTitle: true, postTitle: event.target.value})}/>

                    {postState.published ? 
                        <>
                            <label className="publish-label">
                                This post WILL be visible to other users:</label> 
                            <button style={{fontSize: 'x-large', padding: '2px'}} 
                                onClick={() => setPostState({setPublished: true})}>
                                Make this post private upon save? </button> 
                        </> 
                        : 
                        <>
                            <label className="publish-label">
                                This post will NOT visible to other users:</label>
                            <button style={{fontSize: 'x-large', padding: '2px'}} 
                                onClick={() => setPostState({setPublished: true})}>
                                Publish this post upon save?</button> 
                        </>
                    }
                </header>
                <div className="section-container">
                    {postState.bodyArray.map(mapArray)}
                </div>

                <CreateSection postArray={postState.bodyArray} setPostArray={setPostState}
                    index={postState.bodyArray.length}/>
                <SavePost state={'new'} bodyArray={postState.bodyArray} blogID={getIDfromParams()} 
                    title={postState.postTitle} published={postState.published} saving={true}/>
            </div>
        </div>
    )
} 