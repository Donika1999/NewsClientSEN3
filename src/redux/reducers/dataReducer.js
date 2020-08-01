import { SET_POST, SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, SUBMIT_COMMENT, CREATE_POST, DELETE_POST, SET_USER_POSTS } from '../types';

const initialState = {
    posts: [],
    post: {},
    userposts: [],
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {

        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case SET_USER_POSTS:
            return {
                ...state,
                userposts: action.payload,
                loading: false
            }
        case SET_POST:
            return {
                ...state,
                post: action.payload
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(
                (post) => post.postId === action.payload.postId
            );
            state.posts[index] = action.payload;
            if (state.post.postId === action.payload.postId) {
                state.post = action.payload;
            }
            return {
                ...state
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.post.comments]
                }
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case DELETE_POST:
            index = state.posts.findIndex(
                (post) => post.postId === action.payload
            );
            state.posts.splice(index, 1);
            return {
                ...state
            };
        default:
            return state
    }

}