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
    try {
        const { data } = await client.post(`/post/${postId}/comments/create`, values, {
            headers: {
                "Authorization": `Bearer ${token}`
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