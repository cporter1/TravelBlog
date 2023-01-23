import { useUserContext} from '../models/UserContext.js'
import {createPost ,savePostFormData} from '../api-calls/axios-requests'
import Post from '../models/Post.js'
import {goTo} from '../models/Navigation.js'
import ConfirmPopup from './ConfirmPopup.js'


export default function SavePost({bodyArray , blogID , title , state , postID, published}) {

    const {username} = useUserContext()

    function pushPostArray() {
        const post = new Post()

        if(state === 'new') {
            createPost(username , blogID , post.encodePostArray(bodyArray) , title , published)
        } else if(state === 'update') {
            savePostFormData(post.encodePostArray(bodyArray) , postID)
        }

        // TODO: go to loading page
        setTimeout( () => goTo(`/blogs`) , 3000)
    }

    return (
        <div className='save-post-wrapper'>
            <ConfirmPopup ID='save-post' bgID='save-post-bg'
                handleTask={() => {pushPostArray()}} 
                buttonClass='save-post-button'
                buttonText={state === 'new' ? 'Create New Post' : 'Update Post'}
                confirmText='Are you sure you want to save this post?'/>

            {/* <button className='save-post-button' 
                onClick={ () => { pushPostArray() } } >
                    {state === 'new' ? 'Create New Post' : 'Update Post'}
            </button> */}
        </div>
    )
}