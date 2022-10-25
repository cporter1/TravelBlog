import Post from "../models/Post"

export default function CreateSection({setPostArray, postArray}) {

    const post = new Post()

    return (
        <div className="create-section-container"> 
            <input type='file' accept="image/*"
                onChange={ event => 
                    post.addImage(event.target.files[0] , setPostArray , postArray) } 
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