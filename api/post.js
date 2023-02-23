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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2M3M2NhMGZmNDNiNGIwNTk0ZWQ0MyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzQzNDM0MjgsImV4cCI6MTY3NDQyOTgyOH0.n67C0CH0u0v-_tS9FDGQ5v215eZ-3DqMHfkKqCLnejM"
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
// '/:postId/comments/create'sss

// export const addComment = async (postId, values, accessToken) => {
//     try {
//         // const { data } = await client.post('/post/featured-posts', values)
//         // return data
//         console.log('goodtohear', postId)
//         const url = `/post/${postId}/comments/create`

//         return axios.post(url,  postId,values, accessToken)
//             .then(response => response.data)
//     } catch (error) {
//         const { response } = error
//         if (response?.data) {
//             return response.data;
//         }
//         return { error: error.message || error };
//     }

// }

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
export const getStories = async (limit1, pageNo1) => {
    try {
        const { data } = await client(`/post/get-stories?limit=${limit1}&pageNo=${pageNo1}/`)
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