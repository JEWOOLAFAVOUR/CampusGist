import axios from "axios";
import { updateUserRefreshToken } from "../redux/actions/authAction";
import reduxStore from "../redux/store";
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

export const loginUser = async (email, password) => {
    // console.log('passing otp', otp, userId)
    const data = { email, password }; // create an object with otp and userId
    const response = await makeApiRequest('POST', '/user/signin', data);
    return response;
};

export const verifyEmail = async (otp, userId) => {
    console.log('passing otp', otp, userId)
    const data = { otp, userId }; // create an object with otp and userId
    const response = await makeApiRequest('POST', '/user/verify-email', data);
    return response;
};

export const resendOtp = async (userId) => {
    console.log('passing userId', userId)
    const data = { userId }; // create an object with otp and userId
    const response = await makeApiRequest('POST', '/user/resend-otp', data);
    return response;
};

export const getUserById = async (id) => {
    const response = await makeApiRequest('GET', `/user/find/${id}`);
    return response;
};

// NOT DONE
export const updateUserBioAndLevel = async () => {
    const response = await makeApiRequest('POST', '/user/update-user-bio-level');
    return response;
};
