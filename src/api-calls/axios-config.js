import axios from 'axios'

// export axios config oject to be used in axios requests

const app = axios.create({
    withCredentials: true,
    baseURL:
        process.env.REACT_APP_API_URL
})

export default app;