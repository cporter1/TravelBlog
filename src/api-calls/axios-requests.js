import axios from './axios-config.js'
import { logInContext } from "../models/UserContext"

async function savePostFormData(formData , postID) {
    formData.append('postID' , postID)
    await axios.post('/posts/updatepostarray' , formData ,
        { headers: {'Content-Type': 'multipart/form-data'}})
}

async function logIn(email , password , setContext) {
    const data = {
        email: email,
        password: password
    }
    axios.post('/accounts/signin' , data)
        .then( result => {
            if(result.status === 200) {
                logInContext(email , result.data[0].username , result.data[0].role)
                setContext(email , result.data[0].username , result.data[0].role)

                window.history.pushState({} , '' , '/')
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
            }
        })
        .catch(error => {})
}

async function createAccount(username , password , email , role) {
    const data = {
        email: email,
        username: username,
        password: password,
        role: role
    }
    axios.post('/accounts/createaccount', data)
        .then()
        .catch(error => {})
}

async function createBlog(title , author) {
    const data = {
        title: title,
        author: author
    }

    axios.post('/posts/createblog', data)
        .catch(error => {})
    
}

async function createPost(author, blogID, postArray, title) {
    const data = {
        author: author,
        blogID: blogID,
        title: title
    }

    await axios.post('/posts/createpost' , data)
        .then(async (result) => { 
            savePostFormData(postArray, result.data[0].id); })
        .catch(error => {console.error(error)})

}

async function getMyBlogs(username) {
    return (
        axios.get('/posts/blogsbyauthor' , {
            params: {author : username}
        })
            .then(async result => {
                return result.data
            })
            .catch(error => {})
    )
}

async function getPostsByBlogID(blogID) {
    return (
        axios.get('/posts/postsbyblogid', {
            params: {id: blogID}
        })
            .then(async result => {
                return result.data.rows
            })
            .catch(error => {})
    )
}

async function getAllBlogsAndPosts() {
    return (
        axios.get('/posts/allblogs')
            .then( async result => {
                return result.data
            })
            .catch(error => {})
    )
}

export {savePostFormData, 
        logIn,
        createAccount,
        createPost,
        getPostsByBlogID,
        getAllBlogsAndPosts,
        createBlog,
        getMyBlogs
       }