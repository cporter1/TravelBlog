import axios from 'axios'

const app = axios.create({
    withCredentials: true,
    baseURL:
        'http://192.168.1.66:8080'
})

export default app;