import { useEffect, useRef, useState } from "react";
import { getPostByPostID } from "../api-calls/axios-requests";
import { getIDfromParams } from "../models/URLparams";
import { encode } from "base64-arraybuffer"
import CreateSection from "../components/CreateSection";
import SavePost from "../components/SavePost";

export default function EditPost() {

    // const [post, setPost]             = useState({});
    const [bodyArray, setBodyArray]   = useState([]);
    const postTitle                   = useRef()

    useEffect(() => {
        getPostByPostID(getIDfromParams())
            .then(async result => {
                // console.log('result', result)
                if(result) {
                    // setPost(result)
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
        newArray.splice(index , 1)
        setBodyArray(newArray)
    }

    function mapArray(element , index) {
        console.log(element)
        if(element.type === 'image') {
            return (
                <section className="post-section" key={index}>
                    {(element.url) ? <img className="uploaded-images" src={element.url} key={index} alt='hi' /> : 
                        <img className="uploaded-images" alt=''
                            src={`data:image/jpeg;base64, ${encode(element.file.Body.data)}`}/> 
                    }

                    <input className="image-caption" defaultValue={element.text}
                        onChange={(event => { handleTextChange(event , index) } )}/>
                    <button className="delete-section-button" 
                        onClick={ e => {deleteSection(index)} }>Delete</button>
                </section>
            )
        }
        else if(element.type === 'text') {
            return (
                <section className="post-section" key={index}>
                    <textarea defaultValue={element.text} 
                        onChange={(event) => {handleTextChange(event , index)}}/>
                    <button className="delete-section-button" 
                        onClick={event => {deleteSection(index)}}>Delete</button>
                </section>
            )
        }
    }

    return (

        <div className="section-container">
            <h1 className="post-title">Post Title:</h1>
            <input className="input-post-title" defaultValue={postTitle.current}
                ref={postTitle} /> 
            <br/>

            <div>{bodyArray?.map(mapArray)}</div>

            <CreateSection postArray={bodyArray} setPostArray={setBodyArray}/>
            <SavePost state={'update'} bodyArray={bodyArray} postID={getIDfromParams()} 
                    title={postTitle?.current}/>
        </div>
    )
}