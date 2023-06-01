import client from "./client"
import axios from "axios";

const makeApiRequest = async (method, endpoint, data) => {
    try {
        const response = await client.request({
            method,
            url: endpoint,
            data // add the data parameter to the request options
        });
        return response.data;
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return response.data;
        }
        return { error: error.message || error };
    }
};

// DISCUSSION
export const createDiscussion = async () => {
    const response = await makeApiRequest('POST', '/forum/create-discussion');
    return response;
};

export const getAllDiscussion = async () => {
    const response = await makeApiRequest('GET', '/forum/get-all-discussion');
    return response;
};

// DISCUSSION COMMENT
export const createDiscussionComment = async () => {
    const response = await makeApiRequest('POST', '/forum/create-discussion-comment');
    return response;
};

export const getDiscussionComments = async () => {
    const response = await makeApiRequest('GET', '/forum/get-all-discussion-comment');
    return response;
};

// DISCUSSION COMMENT REPLIES 
export const createDiscussionCommentReplies = async () => {
    const response = await makeApiRequest('POST', '/forum/create-discussion-comment-reply');
    return response;
};

export const getDiscussionCommentsReplies = async () => {
    const response = await makeApiRequest('GET', '/forum/get-all-discussion-comment-reply');
    return response;
};

// DISCUSSION TOOGLE
export const forumToogleLike = async () => {
    const response = await makeApiRequest('POST', '/forum/toogle-like');
    return response;
};

export const forumRemoveLike = async () => {
    const response = await makeApiRequest('POST', '/forum/delete-like');
    return response;
};

// DISCUSSION LIKE COMMENT - REPLIES
export const likeCommentOrReply = async () => {
    const response = await makeApiRequest('POST', '/forum/comment-toggle-like');
    return response;
};

export const removeCommentOrReplyLike = async () => {
    const response = await makeApiRequest('POST', '/forum/comment-remove-like');
    return response;
};