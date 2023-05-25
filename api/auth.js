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


// export const registerUser = async (values) => {
//     try {
//         // const { data } = await client.post('/post/featured-posts', values)
//         // return data
//         const url = 'user/create'

//         return axios.post(url, values)
//             .then(response => response.data)
//     } catch (error) {
//         const { response } = error
//         if (response?.data) {
//             return response?.data;
//         }
//         return { error: error.message || error };
//     }

// }

export const registerUser = async (values) => {
    console.log('djjjjjjjjjjjjj', values)
    // console.log('passing otp', otp, userId)
    //   const data = { firstName, lastName, username, email, password };
    const data = values;
    const response = await makeApiRequest('POST', '/user/create', data);
    return response;
};

export const registerUserWithPhone = async (values) => {
    console.log('djjjjjjjjjjjjj', values)
    // console.log('passing otp', otp, userId)
    //   const data = { firstName, lastName, username, email, password };
    const data = values;
    const response = await makeApiRequest('POST', '/user/create-user-with-phone', data);
    return response;
};

export const loginUser = async (phone, password) => {
    // console.log('passing otp', otp, userId)
    const cool = `234${phone}`
    console.log('cooooooo', cool)
    const data = { phone: cool, password }; // create an object with otp and userId
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
export const updateUserBioAndLevel = async (bio, level, gender) => {
    const data = { bio, level, gender }
    const response = await makeApiRequest('POST', '/user/update-user-bio-level', data);
    return response;
};

// export const updateUserProfilePic = async (userId, data) => {
//     console.log('getttttting', userId, data)
//     const image = new FormData();
//     image.append('file', data);
//     const response = await makeApiRequest('POST', `/user/${userId}/update-avatar`, image);
//     return response;
// };

const makeApiRequest2 = async (method, endpoint, data) => {
    try {
        const headers = {};
        if (data instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data";
        }
        const response = await client.request({
            method,
            url: endpoint,
            data,
            headers
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


// export const updateUserProfilePic = async (userId, image) => {
//     console.log('image coming from clicked from clicked', image)
//     // const formData = new FormData();
//     // formData.append('file', {
//     //     uri: image.path,
//     //     type: image.mime,
//     //     name: 'hello'
//     //     // name: image.path.split('/').pop()
//     // });

//     try {
//         const response = await makeApiRequest2('POST', `/user/${userId}/update-avatar`, image);
//         return response;
//     } catch (error) {
//         const { response } = error;
//         if (response?.data) {
//             return response.data;
//         }
//         return { error: error.message || error };
//     }
// };

export const updateUserProfilePic = async (userId, image) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image.path,
        type: image.mime,
        name: 'avatar.jpg'
    });

    try {
        const response = await makeApiRequest2('POST', `/user/${userId}/update-avatar`, image, {
            'Content-Type': 'multipart/form-data'
        });
        return response;
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
};
