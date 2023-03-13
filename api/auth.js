import axios from "axios";
import client from "./client";

const makeApiRequest = async (method, endpoint, data) => {
    try {
        const response = await client.request({
            method,
            url: endpoint,
            data // add the data parameter to the request options
        });
        return response.data;
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
};

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

export const verifyEmail = async (otp, userId) => {
    console.log('passing otp', otp, userId)
    const data = { otp, userId }; // create an object with otp and userId
    const response = await makeApiRequest('POST', '/user/verify-email', data);
    return response;
};

export const resendOtp = async () => {
    const data = await makeApiRequest('POST', '/user/resend-otp');
    return data;
};

export const updateUserBioAndLevel = async () => {
    const data = await makeApiRequest('POST', '/user/update-user-bio-level');
    return data;
};