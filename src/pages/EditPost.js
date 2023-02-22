import { useEffect, useReducer} from "react";
import { getPostByPostID, changePublishPostStatus } from "../api-calls/axios-requests";
import { getIDfromParams } from "../models/URLparams";
import { encode } from "base64-arraybuffer"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";
import ParagraphInput from "../components/ParagraphInput";

export default function EditPost() {

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
        else if(action.setTitle)
            return {...state,
                postTitle: action.postTitle
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
    }, [])
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
                <>
                <CreateSection postArray={postState.bodyArray} setPostArray={setPostState} index={index}/>
                <section className="post-section" key={element.id}>
                    <div className="img-wrapper">
                    {(element.url) ? 
                        <img className="uploaded-image" src={element.url} key={index} alt='hi' /> 
                        : 
                        <img className="uploaded-image" alt=''
                            src={element.file}/> 
                    }
                        <textarea className="edit-image-caption" defaultValue={element.text}
                            onChange={(event => { handleTextChange(event.target.value , index) } )}/>
                    </div>

                    <button className="delete-section-button" id='delete-img-section'
                        onClick={ () => {deleteSection(index)} }>Delete</button>
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
                        index={index} 
                        onChange={(value) => {console.log('onchnage');handleTextChange(value,index)}}/>
                    <button className="delete-section-button"
                        onClick={() => {deleteSection(index)}}>Delete</button>
                </section>
                </>
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
                <div className="column-container">
                    <div className="post-content">
                        <h1 className="post-title">Post Editor</h1>
                        <header className="edit-post-header-wrapper">
                            <div className="publish-label">Post Title:</div>
                            <input className="input-post-title" defaultValue={postState.postTitle}
                                onChange={(event) => 
                                    {setPostState({setTitle: true , postTitle: event.target.value})}}/>
                            {postState.published ? 
                                <>
                                    <label className="publish-label">This post IS visible to other users</label> 
                                    <button onClick={() => {changePublishPostStatus(getIDfromParams())
                                        setPostState({setPublished: true})}}
                                        className='header-button'>
                                        Make private?</button> 
                                </> 
                                : 
                                <>
                                    <label className="publish-label">
                                        This post is NOT visible to others</label>
                                    <button onClick={() => {changePublishPostStatus(getIDfromParams());
                                        setPostState({setPublished: true})}}
                                        className='header-button'>
                                        Make Public?</button> 
                                </>
                            }
                        </header>
                        <div className="section-container">
                            {postState.bodyArray?.map(mapArray)}
                        </div>

                        <CreateSection postArray={postState.bodyArray} setPostArray={setPostState} 
                            index={postState.bodyArray.length}/>
                        <SavePost state={'update'} bodyArray={postState.bodyArray} postID={getIDfromParams()} 
                                title={postState.postTitle} saving={true}/>
                    </div>
                </div>
            )
    }
}