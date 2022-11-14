import axios from "axios";
import client from "./client";

// Login User 
export const loginUser = async (values) => {
    try {
        // const { data } = await client.post('/post/featured-posts', values)
        // return data
        const url = 'user/signin'

        return axios.post(url, values)
            .then(response => response.data)
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }

}

export const registerUser = async (values) => {
    try {
        // const { data } = await client.post('/post/featured-posts', values)
        // return data
        const url = 'user/create'

        return axios.post(url, values)
            .then(response => response.data)
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }

}