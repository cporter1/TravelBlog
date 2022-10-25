import React, { useEffect, useState } from "react"
import CreateSection from "../components/CreateSection";
import Post from "../models/Post";

export default function CreatePost() {


    const [postArray, setPostArray]   = useState([]);
    const [postTitle, setPostTitle]   = useState('');
    const [isUploading, setIsLoading] = useState(false);

    function handleTextChange(event , index) {
        let newArray = [...postArray]
        let oldElement = {...newArray[index]}
        oldElement.text = event.target.value
        newArray[index] = oldElement
        setPostArray(newArray)
    }

    function mapArray(element , index) {

        if(element.type === 'image') {
            return (
                <section className="post-section">
                    <img className="uploaded-images" src={element.url} key={index} />
                    <input className="image-caption" onChange={(event => {handleTextChange(event , index) } )}/>
                </section>
            )
        }
        else if(element.type === 'text') {
            return (
                <section className="post-section">
                    <textarea onChange={(event) => {handleTextChange(event , index)}}/>
                </section>
            )
        }
    }

    return (
        <div className="content-container">
            <div className="post-content">
                <h1 className="post-title">Post Title:</h1>
                <input className="input-post-title" 
                    onChange={event => {setPostTitle(event.target.value)}} /> 

                <div className="section-container">
                    {postArray.map(mapArray)}
                </div>

                <CreateSection postArray={postArray} setPostArray={setPostArray}/>
            </div>
        </div>
    )
} 