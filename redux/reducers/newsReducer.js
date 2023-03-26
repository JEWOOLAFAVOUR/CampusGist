import { UPDATE_POST_DETAILS, CLEAR_NEWS } from "../constants/constants";

const initialState = {
    posts: [],
};

const MAX_POSTS = 100;

const newsReducer = (state = initialState, action) => {
    const { type, posts } = action;

    switch (type) {
        case UPDATE_POST_DETAILS:
            // Create a new array with only the posts that don't already exist
            const newPosts = posts.filter(
                (post) => !state.posts.some((existingPost) => existingPost.id === post.id)
            );
            return {
                ...state,
                posts: [...state.posts, ...newPosts] // Add the new posts to the existing ones
            };
        case CLEAR_NEWS:
            return {
                ...state,
                posts: [],
            };
        default:
            return state;
    }
};

export default newsReducer;


 // case UPDATE_POST_DETAILS:
        //     // Check if there are already posts in the state
        //     if (state.posts.length > 0) {
        //         // If so, concatenate the new posts to the existing ones
        //         return {
        //             ...state,
        //             posts: [...state.posts, ...posts],
        //         };
        //     } else {
        //         // If not, simply replace the posts array with the new one
        //         return {
        //             ...state,
        //             posts,
        //         };
        //     }