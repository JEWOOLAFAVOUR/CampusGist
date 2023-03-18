import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "../middleware/ApiCalls";

import rootReducer from "../reducers";

let middleware = [thunk, promiseMiddleware];

const handleStoreUpdate = (store) => {
    const newsState = store.getState().news;
    console.log(`Number of posts: ${newsState.posts.length}`);
};

const reduxStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
    )
);

reduxStore.subscribe(() => handleStoreUpdate(reduxStore));

export default reduxStore;
