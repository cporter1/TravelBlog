import axios from './axios-config.js'

async function savePostFormData(formData , option) {
    await axios.post('/posts/savepostarray' , formData ,
        { headers: {'Content-Type': 'multipart/form-data'}})
}

async function logIn(email , password , setContextEmail , setAccountRole , setContextUsername) {

    const data = {
        email: email,
        password: password
    }

    axios.post('/accounts/signin' , data)
        .then( result => {

            if(result.status === 200) {
                console.log(result.data[0].username)
                setContextEmail(email)
                setAccountRole(result.data[0].role)
                setContextUsername(result.data[0].username)

                window.history.pushState({} , '' , '/')
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
            }
        })
        .catch(error => {

        })
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
        createAccount,
        getAllBlogs
       }