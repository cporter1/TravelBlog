import axios from './axios-config.js'
import {useUserContext} from '../models/UserContext'


async function savePostFormData(formData , option) {
    await axios.post('/posts/savepostarray' , formData ,
        { headers: {'Content-Type': 'multipart/form-data'}})
}

async function logIn(email , password , setContextEmail) {

    const data = {
        email: email,
        password: password
    }

    axios.post('/accounts/signin' , data)
        .then( result => {

            if(result.status === 200) {
                setContextEmail(email)
                window.history.pushState({} , '' , '/')
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
                console.log('result')
            }
        })
        .catch(error => {

        })
}

export {savePostFormData , logIn}