import { UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_ACCESS_TOKEN, LOGOUT_USER, UPDATE_USER_REFRESH_TOKEN } from "../constants/constants";
import { UPDATE_USER_BIO, UPDATE_USER_LEVEL_BIO_GENDER } from "../constants/constants";
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

export const updateUserRefreshToken = (refreshToken) => {
    // Set the authentication token in your Axios instance
    // client.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;

    // Return the action object with the access token
    return {
        type: UPDATE_USER_REFRESH_TOKEN,
        refreshToken
    }
}

export const logoutUser = () => {
    // Remove the authentication token from your Axios instance
    delete client.defaults.headers.common['Authorization'];

    // Return the action object to update the state
    return {
        type: LOGOUT_USER
    };
};

export const updateUserBio = (bio) => ({
    type: UPDATE_USER_BIO,
    payload: bio,
});


export const updateUserBioAndLevelAndGender = (bio, gender, level) => ({
    type: UPDATE_USER_LEVEL_BIO_GENDER,
    payload: { bio, gender, level },
});

