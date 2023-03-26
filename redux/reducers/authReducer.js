import { UPDATE_ONBOARDING_STATUS, UPDATE_USER_LOGIN, UPDATE_USER_ACCESS_TOKEN, LOGOUT_USER, UPDATE_USER_REFRESH_TOKEN } from "../constants/constants";
import { UPDATE_USER_BIO } from "../constants/constants";

const initialState = {
    isOnboardingDisabled: false,
    isLoggedIn: false,
    user: {},
    accessToken: "",
    refreshToken: "",
}


const authReducer = (state = initialState, action) => {
    const { status, type, isLoggedIn, user, accessToken, refreshToken } = action;

    switch (type) {
        case UPDATE_ONBOARDING_STATUS:
            return {
                ...state, isOnboardingDisabled: status
            };

        case UPDATE_USER_LOGIN:
            return {
                ...state, user, isLoggedIn
            };

        case UPDATE_USER_ACCESS_TOKEN:
            return {
                ...state, accessToken
            };
        case UPDATE_USER_REFRESH_TOKEN:
            return {
                ...state, refreshToken
            };
        case UPDATE_USER_BIO:
            return {
                ...state,
                user: {
                    ...state.user,
                    bio: action.payload,
                },
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                user: {},
                accessToken: "",
                refreshToken: "",
            };
        default:
            return state;
    }
}

export default authReducer;