import axios from 'axios'

const app = axios.create({
    withCredentials: true,
    baseURL:
        process.env.REACT_APP_API_URL
})

export default app;