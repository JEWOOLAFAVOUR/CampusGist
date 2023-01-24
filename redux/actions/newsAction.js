import { UPDATE_POST_DETAILS } from "../constants/constants";

export const updatePostDetails = (posts) => {
    return {
        type: UPDATE_POST_DETAILS,
        posts,
    }
}