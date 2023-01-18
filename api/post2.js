import client from "./client"
import axios from "axios"

export const getCampusesPosts = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/campuses-posts?limit=${limit}&pageNo=${pageNo}/`)
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

export const getSportPosts = async (limit, pageNo) => {
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

export const getEntertainmentPosts = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/entertainment-posts?limit=${limit}&pageNo=${pageNo}/`)
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

export const getTechnologyPosts = async (limit, pageNo) => {
    try {
        const { data } = await client(`/post/technology-posts?limit=${limit}&pageNo=${pageNo}/`)
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