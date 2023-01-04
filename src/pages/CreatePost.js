import React, {useRef, useState } from "react"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";
import { getIDfromParams } from "../models/URLparams";

export default function CreatePost() {


    const [postArray, setPostArray] = useState([]);
    const postTitle                 = useRef('') 

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
                <section className="post-section" key={index}>
                    <img className="uploaded-images" src={element.url} key={index} alt='hi' />
                    <input className="image-caption" 
                        onChange={(event => {handleTextChange(event , index) } )}/>
                    <button className="delete-section-button" 
                        onClick={ e => {deleteSection(index)} }>Delete</button>
                </section>
            )
        }
        else if(element.type === 'text') {
            return (
                <section className="post-section" key={index}>
                    <textarea onChange={(event) => {handleTextChange(event , index)}}/>
                    <button className="delete-section-button" 
                        onClick={event => {deleteSection(index)}}>Delete</button>
                </section>
            )
        }
    }

    return (
        <div className="content-container">
            <div className="post-content">
                <h1 className="post-title">Post Title:</h1>
                <input className="input-post-title" 
                    ref={postTitle} /> 

                <div className="section-container">
                    {postArray.map(mapArray)}
                </div>

                <CreateSection postArray={postArray} setPostArray={setPostArray}/>
                <SavePost state={'new'} bodyArray={postArray} blogID={getIDfromParams()} 
                    title={postTitle?.current.value}/>
            </div>
        </div>
    )
} 