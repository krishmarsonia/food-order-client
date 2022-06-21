import { call, all } from "redux-saga/effects";

import { fetchCollectionsStart } from "./user/user-sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}
