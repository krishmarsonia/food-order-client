import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import UserReducer from "./user/user-reducer";
import CartReducer from "./cart/cart-reducers";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart','user']
}

const rootReducer = combineReducers({
    user: UserReducer,
    cart: CartReducer
})

export default persistReducer(persistConfig, rootReducer)