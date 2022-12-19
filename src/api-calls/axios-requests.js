import axios from './axios-config.js'

async function savePostFormData(formData , option) {
    await axios.post('/posts/savepostarray' , formData ,
        { headers: {'Content-Type': 'multipart/form-data'}})
}

async function logIn(email , password , setContextEmail , setAccountRole) {

    const data = {
        email: email,
        password: password
    }

    axios.post('/accounts/signin' , data)
        .then( result => {

            if(result.status === 200) {
                console.log(result.data)
                setContextEmail(email)
                setAccountRole(result.data[0].role)
                window.history.pushState({} , '' , '/')
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
            }
        })
        .catch(error => {

        })
}

async function getAllBlogs() {

    return (
        axios.get('/posts/allblogs')
        .then( async result => {
            return result.data
        })
        .catch(error => {

        })
    )
}

export {savePostFormData, 
        logIn,
        getAllBlogs
       }