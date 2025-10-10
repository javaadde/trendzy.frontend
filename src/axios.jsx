import axios from "axios"

const api = axios.create({
    baseURL:"http://52.66.191.156:8000"
})

export default api