import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3333/v1';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3333/v1',
});