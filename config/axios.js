import axios from 'axios';

const LOCAL_API = 'http://localhost:3333/v1'

export const BASE_URL = process.env.API_URL ? process.env.API_URL : LOCAL_API
export const axiosInstance = axios.create({
    baseURL: BASE_URL
});
