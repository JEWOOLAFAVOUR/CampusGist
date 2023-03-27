import { UPDATE_POST_DETAILS, UPDATE_FEATURED_POST, CLEAR_NEWS } from "../constants/constants";

export const updatePostDetails = (posts) => {
    return {
        type: UPDATE_POST_DETAILS,
        posts,
    }
}

export const updateFeaturedPost = (featuredPost) => {
    return {
        type: UPDATE_FEATURED_POST,
        featuredPost,
    }
}

// export const featured = (posts) => {
//     return {
//         type: UPDATE_POST_DETAILS,
//         posts,
//     }
// }



export const clearNews = () => {
    return {
        type: CLEAR_NEWS,
    }
}