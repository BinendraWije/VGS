import axios from "axios";

const BASE_URL = 'https://hiawathaart.art:3306'

export default axios.create({
    baseURL: BASE_URL
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials: true
});

