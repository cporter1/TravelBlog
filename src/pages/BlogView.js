import { useEffect, useState } from "react"
import { getPostsByBlogID } from "../api-calls/axios-requests"
import { getIDfromParams } from "../models/URLparams.js"
import { goTo } from "../models/Navigation"
import { dateHandler } from "../models/TimeFormat"
import { encode } from "base64-arraybuffer"


export default function BlogView() {
    
    const [postsArray , setPostsArray] = useState([])

    useEffect(() => {
        getPostsByBlogID(getIDfromParams())
            .then(async result => {
                if(result) setPostsArray(result);
            })
    },[])


    function postMap(element , index) {
        return (
            <section key={index}>
                <div>{element.title} </div>
                <div>{dateHandler(element.time_posted)}</div>
                <div>
                    {element.body_array?.map(postSectionMap)}
                </div>
                <br/>
            </section>
        )

    }

    function postSectionMap(element , index) {
        if(element['type'] === 'text') { // textbox section
            return (
                <section key={index}>
                    {element.text}
                </section>
            )
        } else if(element['type'] === 'image') {
            return (
                <section key={index}>
                    <img alt='' className="uploaded-images"
                        src={`data:image/;base64, ${encode(element.file.Body.data)}`}/>
                </section>
            )
        } else {console.error('function postSectionMap: invalid array')}
    }

    return (
        <div>
            <button onClick={()=>{goTo(`/createpost/?${getIDfromParams()}`)}}>
                Create Post</button>

            <section>
                {postsArray?.map(postMap)}
            </section>
        </div>
    )
}