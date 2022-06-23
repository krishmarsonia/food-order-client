import { createSelector } from "reselect";

export const selectUser = state => state.user;

export const selectUserName = createSelector(
    [selectUser],
    (user)=> user.userName
)

export const selectAdmin = createSelector(
    [selectUser],
    (user) => user.admin
)

export const seletId = createSelector(
    [selectUser],
    (user) => user.userId
)

export const selectFoodData = createSelector(
    [selectUser],
    (user) => user.foodData
)

export const selectToken = createSelector(
    [selectUser],
    (user) => user.token
)

export const selectisfetching = createSelector(
    [selectUser],
    (user) => user.isFetching
)

export const selectboolFoodData = createSelector(
    [selectUser],
    (user) => !!user.foodData
)