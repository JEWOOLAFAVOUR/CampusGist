import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "../middleware/ApiCalls";

import rootReducer from "../reducers";
import { checkTokenExpiration } from "../reducers/midToken";

// let middleware = [thunk, checkTokenExpiration];
let middleware = [thunk];



const handleStoreUpdate = (store) => {
    const newsState = store.getState().news;
    console.log(`Number of posts: ${newsState.posts.length}`);
    console.log(`Number of featuredPost: ${newsState.featuredPost.length}`);
};
// const refreshToken = (store) => {
//     const rF = store.getState().auth.refreshToken
//     console.log('dddddddd', rF)
// }

const reduxStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
    )
);

reduxStore.subscribe(() => handleStoreUpdate(reduxStore));
// reduxStore.subscribe(() => refreshToken(reduxStore));

export default reduxStore;
