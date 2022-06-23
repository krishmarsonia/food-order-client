import { call, all } from "redux-saga/effects";

import { fetchCollectionsStart, loginUserStart } from "./user/user-sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(loginUserStart)]);
}
