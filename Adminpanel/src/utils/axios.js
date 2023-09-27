import axios from "axios";

const BASE_URL = 'http://13.49.145.29:3306'

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials: true
});