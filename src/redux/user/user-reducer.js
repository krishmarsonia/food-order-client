import { UserActionTypes } from "./user-types";

const INITIAL_STATE = {
  userName: "",
  admin: false,
  userId: "",
  numberOfCartItems: null,
  cartItems: [],
  foodData: null,
  isFetching: false,
  errorMessage: undefined,
  authError: '',
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.Set_Current_UserName:
      return {
        ...state,
        userName: action.payload,
      };
    case UserActionTypes.Set_Admin:
      return{
        ...state,
        admin: action.payload
      }
    // case UserActionTypes.Set_Admin_True:
    //   return {
    //     ...state,
    //     admin: true,
    //   };
    // case UserActionTypes.Set_Admin_False:
    //   return {
    //     ...state,
    //     admin: false,
    //   };
    case UserActionTypes.Set_Id_of_User:
      return {
        ...state,
        userId: action.payload,
      };
    case UserActionTypes.Set_Num_of_Cart:
      return {
        ...state,
        numberOfCartItems: action.payload,
      };
    case UserActionTypes.Set_Food_Data:
      return {
        ...state,
        foodData: action.payload,
      };
    case UserActionTypes.Set_IsFetching:
      return {
        ...state,
        isFetching: action.payload,
      };
    case UserActionTypes.Set_AuthError:
      return{
        ...state,
        authError: action.payload
      };
    case UserActionTypes.Set_FetchCollections_Start:
      return {
        ...state,
        isFetching: true,
      };
    case UserActionTypes.Set_FetchCollections_Sucess:
      return {
        ...state,
        foodData: action.payload,
        isFetching: false,
      };
    case UserActionTypes.Set_FetchCollections_Failure:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    

    default:
      return state;
  }
};

export default UserReducer;
