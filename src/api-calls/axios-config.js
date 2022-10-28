import axios from 'axios'

const app = axios.create({
    baseURL:
        'http://localhost:8080'
})

export default app;