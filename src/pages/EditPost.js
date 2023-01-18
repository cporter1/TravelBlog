import { useEffect, useRef, useState } from "react";
import { getPostByPostID, changePublishPostStatus } from "../api-calls/axios-requests";
import { getIDfromParams } from "../models/URLparams";
import { encode } from "base64-arraybuffer"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";
import ConfirmPopup from "../components/ConfirmPopup";

export default function EditPost() {

    const [published , setPublished]  = useState()
    const [bodyArray, setBodyArray]   = useState([]);
    const postTitle                   = useRef()

    useEffect(() => {
        getPostByPostID(getIDfromParams())
            .then(async result => {
                if(result) {
                    setPublished(result.published)
                    setBodyArray(result.body_array)
                    postTitle.current = result.title
                }
            })
    }, [] )

    function handleTextChange(event , index) {
        let newArray = [...bodyArray]
        let oldElement = {...newArray[index]}
        oldElement.text = event.target.value
        newArray[index] = oldElement
        setBodyArray(newArray)
    }

    function deleteSection(index) {
        let newArray = [...bodyArray]
        if(index === 0) {
            console.log('shift')
            newArray.shift()
        } else {
            newArray.splice(index , 1)
        }
        setBodyArray(newArray)
    }

    function mapArray(element , index) {
        if(element.type === 'image') {
            return (
                <section className="post-section" key={index}>
                    <div className="img-wrapper">
                    {(element.url) ? 
                        <img className="uploaded-image" src={element.url} key={index} alt='hi' /> 
                        : 
                        <img className="uploaded-image" alt=''
                            src={`data:image/jpeg;base64, ${encode(element.file.Body.data)}`}/> 
                    }
                        <textarea className="edit-image-caption" defaultValue={element.text}
                            onChange={(event => { handleTextChange(event , index) } )}/>
                    </div>

                    <button className="delete-section-button" id='delete-img-section'
                        onClick={ e => {deleteSection(index)} }>Delete</button>
                </section>
            )
        }
        else if(element.type === 'text') {
            return (
                <section className="post-section" key={index}>
                    <textarea className="post-text" defaultValue={element.text} 
                        onChange={(event) => {handleTextChange(event , index)}}/>
                    <button className="delete-section-button"
                        onClick={event => {deleteSection(index)}}>Delete</button>
                </section>
            )
        }
    }

    return (
        <div className="column-container">
            <div className="post-content">
                <h1 style={{marginTop: '1%', marginBottom: '1%'}}>Post Editor</h1>
                <header className="edit-post-header-wrapper">
                        <div className="post-title">Post Title:</div>
                        <input className="input-post-title" defaultValue={postTitle.current}
                            ref={postTitle} />
                        <ConfirmPopup ID='pushTitle' bgID='pushTitlebg'
                            handleTask={() => console.log('worked')}
                            buttonClass='header-button'
                            buttonText='Save Title'
                            confirmText='Are you sure you want to save the title?'/>
                    {published ? 
                        <>
                            <label>This post IS visible to other users.</label> 
                            <button style={{width: '50%', }} onClick={() => {changePublishPostStatus(getIDfromParams())
                                setPublished(current => !current)}}
                                className='header-button'>
                                Make this post private?</button> 
                        </> 
                        : 
                        <>
                            <label>This post is NOT visible to other users.</label>
                            <button onClick={() => {changePublishPostStatus(getIDfromParams());
                                setPublished(current => !current)}}
                                className='header-button'>
                                Publish this post?</button> 
                        </>
                    }

                </header>
                <div className="section-container">{bodyArray?.map(mapArray)}</div>

                <CreateSection postArray={bodyArray} setPostArray={setBodyArray}/>
                <SavePost state={'update'} bodyArray={bodyArray} postID={getIDfromParams()} 
                        title={postTitle?.current}/>
            </div>
        </div>
    )
}