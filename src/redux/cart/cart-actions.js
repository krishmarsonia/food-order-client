import { CartActionTypes } from "./cart-types"

export const AddItemToCart = (CartItem) => ({
    type: CartActionTypes.AddItemToCart,
    payload: CartItem
});

export const DeleteItemFromCart = (CartItems) => ({
    type: CartActionTypes.DeleteItemFromCart,
    payload: CartItems
})

export const CartItemDecrease = (CartItems) => ({
    type: CartActionTypes.CartItemDecrease,
    payload: CartItems
})

export const CartEmpty = () => ({
    type: CartActionTypes.EmptyCart
})

export const CartSet = (Cart) => ({
    type: CartActionTypes.SetCartLoginIn,
    payload: Cart
})

export const SetCartCount = (num) => ({
    type: CartActionTypes.SetCount,
    payload: num
}) 

export const SetCartLoaded = (bol) => ({
    type: CartActionTypes.SetCartLoaded,
    payload: bol
})