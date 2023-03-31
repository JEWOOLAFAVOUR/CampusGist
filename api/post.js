import client from "./client"
import axios from "axios";

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

export const getFeaturedPosts = async () => {
    try {
        const { data } = await client('/post/featured-posts')
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getLatestPosts = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/posts?limit=${limit}&pageNo=${pageNo}/`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getSinglePost = async (slug) => {
    try {
        const { data } = await client(`/post/single/${slug}`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}


// export const addComment = async (postId, comment) => {
//     console.log('ldjjjjjjjjjjjjj', comment)
//     try {
//         const { data } = await client.post(`/post/${postId}/comments/create`, comment)

//         // console.log('data', data)
//         return data
//     } catch (error) {
//         const { response } = error
//         if (response?.data) {
//             return response.data;
//         }
//         return { error: error.message || error };
//     }
// }

export const addComment = async (postId, comment) => {
    // console.log('passing otp', otp, userId)
    const data = { comment }; // create an object with otp and userId
    const response = await makeApiRequest('POST', `/post/${postId}/comments/create`, data);
    return response;
};

export const toggleLike = async (postId) => {
    try {
        const { data } = await client.post(`/post/${postId}/toggle-like`)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

// NOT CONSUME TOTALLY 
export const getSimilerPost = async (id) => {
    try {
        const { data } = await client(`/post/related-posts/${id}`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}


export const searchPost = async (query) => {
    try {
        const { data } = await client(`/post/search?title=${query}`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getUser = async (userId) => {
    try {
        const { data } = await client(`/user/find/${userId}`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

// NEW FEATURES 

export const getFood = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/get-food?limit=${limit}&pageNo=${pageNo}/`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getEachFood = async (slug) => {
    try {
        const { data } = await client(`/post/get-food-slug/${slug}`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getMarket = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/get-market?limit=${limit}&pageNo=${pageNo}/`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getEacMarket = async (slug) => {
    try {
        const { data } = await client(`/post/get-market-slug/${slug}`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const getBanner = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/get-banner?limit=${limit}&pageNo=${pageNo}/`)
        // console.log(data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

export const handleLike = async (postId) => {
    try {
        const { data } = await client.post(`/post/${postId}/toggle-like`)

        console.log('toggle', data);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
};

export const handleUnlike = async (postId, token) => {
    console.log(token, 'token at tis point')
    try {
        const { data } = await client.delete(`/post/${postId}/toggle-like`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        console.log('delete', data);
        return data;
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
};

export const getComments = async (postId) => {
    const response = await makeApiRequest('GET', `/post/${postId}/comments`);
    return response;
};