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
export const likeMenuItem = async (restaurantId, menuId, token) => {
    console.log(token, 'token at tis point')
    try {
        const { data } = await client.post(`/campus-circle/${restaurantId}/menu/${menuId}/like-food`, null, {
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

export const getAllMarket = async () => {
    const response = await makeApiRequest('GET', '/campus-circle/get-markets');
    return response;
};

export const getMarketById = async (marketId) => {
    const response = await makeApiRequest('GET', `/campus-circle/markets/${marketId}`);
    return response;
};