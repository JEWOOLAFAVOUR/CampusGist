import client from "./client"
import axios from "axios";

export const getAllRestaurant = async () => {
    try {
        const { data } = await client(`/campus-circle/get-all-restaurant/`)
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

export const getRestaurantById = async (postId) => {
    try {
        const { data } = await client(`/campus-circle/${postId}/get-restaurant/`)
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

export const getRecommendedFood = async () => {
    try {
        const { data } = await client(`/campus-circle/get-recommended-food/`)
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

export const getPopularFood = async () => {
    try {
        const { data } = await client(`/campus-circle/get-popular-food/`)
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