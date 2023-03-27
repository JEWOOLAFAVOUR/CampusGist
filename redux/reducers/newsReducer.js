import { UPDATE_POST_DETAILS, UPDATE_FEATURED_POST, CLEAR_NEWS } from "../constants/constants";

const initialState = {
    posts: [],
    featuredPost: [],
};

const MAX_POSTS = 100;

const newsReducer = (state = initialState, action) => {
    const { type, posts, featuredPost } = action;

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
        case UPDATE_FEATURED_POST:
            // Create a new array with only the posts that don't already exist
            const freshPost = featuredPost.filter(
                (post) => !state.featuredPost.some((existingPost) => existingPost.id === post.id)
            );
            return {
                ...state,
                featuredPost: [...state.featuredPost, ...freshPost] // Add the new posts to the existing ones
            };
        case CLEAR_NEWS:
            return {
                ...state,
                posts: [],
                featuredPost: [],
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