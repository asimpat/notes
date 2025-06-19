// interceptor === this intercept any requests that is sent and automatically add the header (we do not need to write is differnt times)
// using axios as this interceptor == any time a request is sent it checks if there is an access token and if present, it automatically adds it to that request
import axios from "axios";
import { ACCESS_TOKEN } from "./constant";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL // this allows use import anything that is specify in the environment variable file
})

api.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
    
)

export default api