import { UPDATE_POST_DETAILS, CLEAR_NEWS } from "../constants/constants";

export const updatePostDetails = (posts) => {
    return {
        type: UPDATE_POST_DETAILS,
        posts,
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