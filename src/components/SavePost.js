import { useUserContext} from '../models/UserContext.js'
import {createPost ,savePostFormData, savePostTitle} from '../api-calls/axios-requests'
import Post from '../models/Post.js'
import {goTo} from '../models/Navigation.js'
import ConfirmPopup from './ConfirmPopup.js'


export default function SavePost({bodyArray , blogID , title , state , postID, published, saving, 
    pageStateFunction}) {

    const {username} = useUserContext()

    function pushPostArray() {
        const post = new Post()

        savePostTitle(postID, title)

        if(state === 'new') {
            createPost(username , blogID , post.encodePostArray(bodyArray) , title , published)
        } else if(state === 'update') {
            savePostFormData(post.encodePostArray(bodyArray) , postID)
        }

        pageStateFunction({setLoading:true})
        setTimeout( () => goTo(`/blogs`) , 3000)
    }
    if(!title || title.trim() === '') {
        return (
            <div className='save-post-wrapper'>
                <ConfirmPopup ID='save-post' bgID='save-post-bg'
                    handleTask={() => {pushPostArray()}} 
                    buttonClass='save-post-button'
                    buttonText={state === 'new' ? 'Create New Post' : 'Update Post'}
                    confirmText='Please add a title before saving.'
                    noTitle={true}
                />
            </div>
        )
    }
    else {
        return (
            <div className='save-post-wrapper'>
                <ConfirmPopup ID='save-post' bgID='save-post-bg'
                    handleTask={() => {pushPostArray()}} 
                    buttonClass='save-post-button'
                    buttonText={state === 'new' ? 'Create New Post' : 'Update Post'}
                    confirmText='Are you sure you want to save this post?'
                    saving={saving}
                />
            </div>
        )
    }
}