import { CartActionTypes } from "./cart-types"

import { QuantityCartItem, CartItemDelete, CartItemless } from "./cart-utils"

const INITIAL_STATE = {
    cartItems: [],
    count: 0,
    cartLoaded: false,
}

const CartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CartActionTypes.AddItemToCart:
            return {
                ...state,
                cartItems: QuantityCartItem(state.cartItems, action.payload)
            }

        case CartActionTypes.DeleteItemFromCart:
            return{
                ...state,
                cartItems: CartItemDelete(state.cartItems, action.payload)
            }

        case CartActionTypes.CartItemDecrease:
            return{
                ...state,
                cartItems: CartItemless(state.cartItems, action.payload)
            }
        case CartActionTypes.EmptyCart:
            return{
                ...state,
                cartItems: []
            }
        case CartActionTypes.SetCartLoginIn:
            return{
                ...state,
                cartItems: action.payload
            }
        case CartActionTypes.SetCount:
            return{
                ...state,
                count: action.payload
            }
        case CartActionTypes.SetCartLoaded:
            return{
                ...state,
                cartLoaded: action.payload
            }

        default:
            return state
    }
}

export default CartReducer;