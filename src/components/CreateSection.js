import { useState } from "react"
import Post from "../models/Post"

export default function CreateSection({setPostArray, postArray}) {

    const post = new Post()

    const [reset , setReset] = useState('')

    return (
        <div className="create-section-container"> 
            <input type='file' accept="image/*"
                onChange= { event => {
                    post.addImage(event.target.files[0], 
                        setPostArray, postArray)
                    setReset(Date.now())
                }}
                key={reset} style={{color:'transparent'}}
            />
            <button className="add-text-button"
                onClick={event => {
                    post.addTextbox(setPostArray, postArray)
                }}>
                Add Textbox
            </button>
        </div>
    )
}