
import axios from "axios";
import client from "../client";

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

export const appOpen = async () => {
    const response = await makeApiRequest('POST', `/user/app-opens`);
    console.log('app opens response', response)
    return response;
};