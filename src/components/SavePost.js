import { useUserContext} from '../models/UserContext.js'
import {createPost ,savePostFormData} from '../api-calls/axios-requests'
import Post from '../models/Post.js'
import {goTo} from '../models/Navigation.js'


export default function SavePost({bodyArray , blogID , title , state , postID}) {

    const {username} = useUserContext()

    function pushPostArray() {
        const post = new Post()

        if(state === 'new') {
            createPost(username , blogID , post.encodePostArray(bodyArray) , title)
        } else if(state === 'update') {
            savePostFormData(post.encodePostArray(bodyArray) , postID)
        }

        // TODO: go to loading page
        setTimeout( () => goTo(`/blogs`) , 3000)
    }

    return (
        <div>
            <button disabled={ !(title && bodyArray[0]) } 
                onClick={ () => { pushPostArray() } } >
                {state === 'new' ? 'Save New Post' : 'Update Post'}
            </button>
        </div>
    )
}