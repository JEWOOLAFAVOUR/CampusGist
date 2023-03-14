import axios from "axios";
import constants from "../redux/constants";
import reduxStore from "../redux/store";

const { BASE_URL } = constants;

const client = axios.create({ baseURL: BASE_URL })

// Add a request interceptor to add the authentication token to every request
client.interceptors.request.use(
    function (config) {
        // Get the authentication token from your Redux store
        const token = reduxStore.getState().auth.accessToken;

        // Add the token to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default client;