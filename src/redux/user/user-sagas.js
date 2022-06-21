import axios from "axios";
import { put, takeLatest, call, take } from "redux-saga/effects";
import { useHistory } from "react-router-dom";

import { UserActionTypes } from "./user-types";
import {
  fetchCollectionSucess,
  fetchCollectionsFailure,
  setAuthError,
  setUserId,
  setAdmin,
  setCurrentUserName,
} from "./user-actions";



function fetchFoodArr() {
  const result = axios.get("http://localhost:5050/getFood", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result;
}

export function* fetchCollectionAsync() {
  try {
    console.log("hii there saga");
    const foodData = yield call(fetchFoodArr);
    console.log(foodData);
    yield put(fetchCollectionSucess(foodData));
  } catch (error) {
    console.log(error);
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    UserActionTypes.Set_FetchCollections_Start,
    fetchCollectionAsync
  );
}

export function fetchUser(info) {
  const emails = info.userEmail;
  const passwords = info.userPassword;
  try {
    const user = axios.post("http://localhost:5050/sign", {
      data: {
        email: emails,
        password: passwords,
      },
    });
    console.log(user);
  return user;
  } catch (error) {
    console.log(error);
  }

  
}

export function* LoginUserAsync(data) {
  const history = useHistory();
  // try {
    let userInfo = yield call(fetchUser, data)
    console.log(userInfo);
    // if(userInfo.data.error){
    //   yield call(setAuthError, userInfo.data.error);
    // }else{
      yield call(localStorage.setItem, "token", userInfo.data.token);
      yield call(localStorage.setItem, "userName", userInfo.data.userName);
      yield put(setUserId(userInfo.data.id));
    //   if(userInfo.data.admin === true){
    //     yield call(setAdmin, true)
    //   }
      yield put(setAdmin(true));
      yield put(setCurrentUserName(userInfo.data.userName));
    // }
    // history.push("/home");
  // } catch (err) {
    // if (err.response) {
    //   yield call(setAuthError, err.response.data.message);
    //   // setError(err.response.data.message);
    // } else {
    //   yield call(setAuthError, err.message);
    //   // setError(err.message);
    // }
  // }
    history.push('/home');

}

export function* loginUserStart() {
  yield takeLatest(UserActionTypes.Set_SigninUser_Start, LoginUserAsync);
  // console.log(data);
  // yield call(LoginUserAsync, data);
}
