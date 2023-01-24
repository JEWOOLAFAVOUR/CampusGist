import { UPDATE_POST_DETAILS } from "../constants/constants";

const initialState = {
    posts: []
};

const newsReducer = (state = initialState, action) => {
    const { type, posts } = action;

    switch (type) {
        case UPDATE_POST_DETAILS:
            return {
                ...state, posts
            };
        default:
            return state;
    }
}

export default newsReducer;