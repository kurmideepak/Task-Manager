import axios from 'axios';

const api = axios.create({
    baseURL: '/api/tasks',
});

export default api;
