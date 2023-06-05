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
export const createDiscussion = async (data) => {
    const response = await makeApiRequest('POST', '/forum/create-discussion', data);
    return response;
};

export const getAllDiscussion = async () => {
    const response = await makeApiRequest('GET', '/forum/get-all-discussion');
    return response;
};

// GET ALL CATEGORY
export const getAllForumCategory = async () => {
    const response = await makeApiRequest('GET', '/forum/get-all-forum-category');
    return response;
};

// DISCUSSION COMMENT
export const createDiscussionComment = async (discussionId, comment) => {
    console.log('fffffffffffffffff', comment)
    const data = { comment };
    const response = await makeApiRequest('POST', `/forum/${discussionId}/create-discussion-comment`, data);
    return response;
};

export const getDiscussionComments = async (discussionId) => {
    const response = await makeApiRequest('GET', `/forum/${discussionId}/get-all-discussion-comment`);
    return response;
};

// DISCUSSION COMMENT REPLIES 
export const createDiscussionCommentReplies = async (discussionId, commentId, comment) => {
    const body = { comment }
    const response = await makeApiRequest('POST', `/forum/${discussionId}/${commentId}/create-discussion-comment-reply`, body);
    return response;
};

export const getDiscussionCommentsReplies = async () => {
    const response = await makeApiRequest('GET', '/forum/get-all-discussion-comment-reply');
    return response;
};

// DISCUSSION TOOGLE
export const forumToogleLike = async (postId) => {
    const response = await makeApiRequest('POST', `/forum/${postId}/toggle-like`);
    return response;
};

export const forumRemoveLike = async (postId) => {
    const response = await makeApiRequest('POST', `/forum/${postId}/delete-like`);
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