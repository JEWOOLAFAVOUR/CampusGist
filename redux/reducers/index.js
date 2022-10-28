import { persistCombineReducers } from "redux-persist";
import constants from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
    key: constants.asyncStorageKey,
    storage: AsyncStorage,
    blacklist: []
}


const appReducer = persistCombineReducers(config, {
    // news: newsReducer
});


const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;