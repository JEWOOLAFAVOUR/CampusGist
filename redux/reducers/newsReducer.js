import { UPDATE_POST_DETAILS, UPDATE_FEATURED_POST, CLEAR_NEWS } from "../constants/constants";

const initialState = {
    posts: [],
    featuredPost: [],
};

const MAX_POSTS = 10;

const newsReducer = (state = initialState, action) => {
    const { type, posts, featuredPost } = action;

    switch (type) {
        // case UPDATE_POST_DETAILS:
        //     // Create a new array with only the posts that don't already exist
        //     const newPosts = posts.filter(
        //         (post) => !state.posts.some((existingPost) => existingPost.id === post.id)
        //     );

        //     let updatedPosts = [];

        //     // Check if we need to remove some posts to stay under the limit
        //     if (state.posts.length + newPosts.length > MAX_POSTS) {
        //         const numToRemove = state.posts.length + newPosts.length - MAX_POSTS;
        //         const postsToKeep = state.posts.slice(numToRemove);
        //         updatedPosts = [...postsToKeep, ...newPosts];
        //     } else {
        //         updatedPosts = [...state.posts, ...newPosts];
        //     }

        //     // // Sort the updatedPosts array in descending order based on their creation date
        //     // updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        //     return {
        //         ...state,
        //         posts: updatedPosts,
        //     };
        case UPDATE_POST_DETAILS:
            // Create a new array with only the posts that don't already exist
            // const newPosts = posts.filter(
            //     (post) => !state.posts.some((existingPost) => existingPost.id === post.id)
            // );

            // let updatedPosts = [];

            // // Check if we need to remove some posts to stay under the limit
            // if (state.posts.length + newPosts.length > MAX_POSTS) {
            //     const numToRemove = state.posts.length + newPosts.length - MAX_POSTS;
            //     const postsToKeep = state.posts.slice(numToRemove);
            //     updatedPosts = [...postsToKeep, ...newPosts];
            // } else {
            //     updatedPosts = [...state.posts, ...newPosts];
            // }

            // // Sort the updatedPosts array in descending order based on their creation date
            // updatedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // // Update the persisted posts
            // const latestPosts = updatedPosts.slice(0, 10); // Get the latest 5 posts

            // console.log('latestPosts:', latestPosts);
            // console.log('updatedPosts:', updatedPosts);
            // console.log('newPosts:', newPosts);

            // return {
            //     ...state,
            //     posts: latestPosts,
            // };
            const coolPost = posts.filter(
                (post) => !state.posts.some((existingPost) => existingPost.id === post.id)
            );
            return {
                ...state,
                posts: [...state.posts, ...coolPost] // Add the new posts to the existing ones
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