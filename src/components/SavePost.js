import { useUserContext} from '../models/UserContext.js'
import {createPost} from '../api-calls/axios-requests'
import Post from '../models/Post.js'
import {goTo} from '../models/Navigation.js'

export default function SavePost({postArray , blogID , title}) {

    const {username} = useUserContext()


    function pushPostArray() {
        const post = new Post()
        createPost(username , blogID , post.encodePostArray(postArray) , title)

        // TODO: go to loading page
        setTimeout( () => goTo(`/blogs/?${blogID}`) , 5000)
    }

    return (
        <div>
            <button disabled={ !(title && postArray[0]) } 
                onClick={ () => { pushPostArray() } } >
                Save Post
            </button>
        </div>
    )
}