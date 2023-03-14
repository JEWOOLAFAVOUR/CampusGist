import { UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_ACCESS_TOKEN } from "../constants/constants";
import client from "../../api/client";

export const updateOnboarding = (status) => {
    return {
        type: UPDATE_ONBOARDING_STATUS,
        status
    }
}

export const updateUserLogin = (user, isLoggedIn) => {
    return {
        type: UPDATE_USER_LOGIN,
        user,
        isLoggedIn,
    }
}

export const updateUserAccessToken = (accessToken) => {
    // Set the authentication token in your Axios instance
    client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    // Return the action object with the access token
    return {
        type: UPDATE_USER_ACCESS_TOKEN,
        accessToken
    }
}

