import axios from 'axios';

export const BASE_URL = 'https://server-avalitika.herokuapp.com/v1'
export const axiosInstance = axios.create({
    baseURL: BASE_URL
});
