import React, { useEffect } from "react";

import { UserActionTypes } from "./user-types";

// import axios from 'axios';
import axios from "axios";

export const setCurrentUserName = (UserName) => ({
  type: UserActionTypes.Set_Current_UserName,
  payload: UserName,
});

export const setAdmin = (admin) => ({
  type: UserActionTypes.Set_Admin,
  payload: admin
})

export const setUserId = (id) => ({
  type: UserActionTypes.Set_Id_of_User,
  payload: id,
});

export const setUsernum = (num) => ({
  type: UserActionTypes.Set_Num_of_Cart,
  payload: num,
});

export const setisFetching = (val) => ({
  type: UserActionTypes.Set_IsFetching,
  payload: val,
});

export const setAuthError = (error) => ({
  type: UserActionTypes.Set_AuthError,
  payload: error
})

export const setFoodData = (food) => ({
  type: UserActionTypes.Set_Food_Data,
  payload: food,
});

export const fetchCollectionStart = () => ({
  type: UserActionTypes.Set_FetchCollections_Start,
});

export const fetchCollectionSucess = (foodData) => ({
  type: UserActionTypes.Set_FetchCollections_Sucess,
  payload: foodData,
});

export const fetchCollectionsFailure = (ErrorMessage) => ({
  type: UserActionTypes.Set_FetchCollections_Failure,
  payload: ErrorMessage,
});

export const signinUserStart = (data) => ({
  type: UserActionTypes.Set_SigninUser_Start,
  payload: data
})

