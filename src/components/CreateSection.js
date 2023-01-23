import { useState } from "react"
import Post from "../models/Post"

export default function CreateSection({setPostArray, postArray}) {

    const post = new Post()


    return (
        <div className="create-section-container"> 
            <input className="add-text-button" type='file' 
                accept="image/*" style={{color: 'transparent'}}
                onChange= { event => {
                    post.addImage(event.target.files[0], 
                        setPostArray, postArray)
                }}
            />
            <button className="add-text-button"
                onClick={event => {
                    post.addTextbox(setPostArray, postArray)
                }}>
                New Paragraph
            </button>
        </div>
    )
}