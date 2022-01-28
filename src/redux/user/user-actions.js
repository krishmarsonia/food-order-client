import { UserActionTypes } from "./user-types"

export const setCurrentUserName = UserName => ({
    type: UserActionTypes.Set_Current_UserName,
    payload: UserName
})

export const setAdminTrue = () => ({
    type: UserActionTypes.Set_Admin_True
})

export const setAdminFalse = () => ({
    type: UserActionTypes.Set_Admin_False
})

export const setUserId = (id) => ({
    type: UserActionTypes.Set_Id_of_User,
    payload: id
})

export const setUsernum = (num) => ({
    type: UserActionTypes.Set_Num_of_Cart,
    payload:num
})

export const setFoodData = (food) => ({
    type: UserActionTypes.Set_Food_Data,
    payload: food
})

