import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            alert('You need to setup the JWT before using this application');
        }
    },
);