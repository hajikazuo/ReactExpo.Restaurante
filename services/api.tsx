import axios from 'axios';

const api = axios.create({
    baseURL : "https://localhost:7170",
})

export default api;