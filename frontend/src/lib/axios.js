import axios from "axios";

//create axios instance
export const axiosInstance = axios.create({
    baseUrl: "http://localhost:5000/api", // base url for the server
    withCredentials: true, // to send cookies with the request
});

