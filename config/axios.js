import axios from 'axios';

const TEST_API = 'https://server-avalitika.herokuapp.com/v1' // Substitute this for your test api.

export const BASE_URL = process.env.API_URL ? process.env.API_URL : TEST_API
export const axiosInstance = axios.create({
    baseURL: BASE_URL
});
