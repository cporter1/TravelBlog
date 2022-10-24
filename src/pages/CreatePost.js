import React, { useEffect, useState } from "react"
import CreateSection from "../components/CreateSection";

export default function CreatePost() {

    const [postArray, setPostArray] = useState([]);
    const [isUploading, setIsLoading] = useState(false);
    

    function addImage(file) {
        if (file == null) return;

        setPostArray(postArray => [...postArray,  
                { 
                    data: file,
                    url: URL.createObjectURL(file) 
                } ]
        )
    }

    return (
        <div>
            <div id="content">
                {postArray.map((image) => {
                    return (<img className="uploaded-images" src={image.url} /> )
                })}
            </div>
            <CreateSection addImage={addImage} />
        </div>
    )
} 