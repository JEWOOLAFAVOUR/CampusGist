import client from "./client"
import axios from "axios";

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


export const addComment = async (postId, values, token) => {
    // console.log('post Id', postId, token, values)
    console.log('post Id', token)
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzU4ZTUzMGI3YWJmZjRlZmI2MGZhZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI2MzMzODcsImV4cCI6MTY3MzQ5NzM4N30.az52ewehIKsheRyMsbhfaY1p181EmY10lgnCrwjTTM4"
    try {
        const { data } = await client.post(`/post/${postId}/comments/create`, values, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        // console.log('data', data)
        return data
    } catch (error) {
        const { response } = error
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
}

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

export const handleLike = async (postId, token) => {
    console.log(token, 'token at tis point')
    try {
        const { data } = await client.post(`/post/${postId}/toggle-like`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

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
