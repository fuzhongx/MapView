import axios from 'axios'

const service = axios.create({
    url: 'https://noda.ac.cn/',
    timeout: 5000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
})

service.interceptors.request.use(response => {
    return response
}),
    (error) => {
        return Promise.reject(error)
    }


service.interceptors.response.use(config => {
    return config
}),
    (error) => {
        return Promise.reject(error)
    }




export default service