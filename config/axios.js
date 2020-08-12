import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3333/v1';

const BASE_URL = 'https://server-avalitika.herokuapp.com/v1'

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});