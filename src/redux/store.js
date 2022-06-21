import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk  from 'redux-thunk'
import { persistStore } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "./root-reducer";
import { fetchCollectionsStart } from "./user/user-sagas";
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middelewares = [sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middelewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
