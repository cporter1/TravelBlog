import Post from "../models/Post"
// takes in post arrays and adds picture or textbox

export default function CreateSection({setPostArray, postArray, index}) {
    const post = new Post()

    return (
        <div className="create-section-container"> 
            <input className="add-text-button" type='file' 
                accept="image/*" style={{color: 'transparent'}}
                onChange= { event => {
                    post.addImage(event.target.files[0], 
                        setPostArray, postArray, index)
                    }}
                alt='submit'
            />
            <button className="add-text-button"
                onClick={event => {
                    post.addTextbox(setPostArray, postArray, index)
                }}>
                New Paragraph
            </button>
        </div>
    )
}