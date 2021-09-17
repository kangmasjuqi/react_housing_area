import axios from 'axios';

const api = axios.create({
    baseURL: 'http://api-url-here.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = token;
        // else delete api.defaults.headers.common.Authorization;
        return config;
    },

    (error) => Promise.reject(error)
);

export default api;
