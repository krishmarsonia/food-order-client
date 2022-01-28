import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
  [selectCart],
  (cart) => cart.count
);

export const selectCartLoaded = createSelector(
 [selectCart],
 (cart) => cart.cartLoaded 
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],

  (cartItems) =>
    cartItems.reduce(
      (sumQuantity, cartItems) => sumQuantity + cartItems.quantity,
      0
      //phela aa zero nu joi le and if 0 ma unsucessfull thy to nav ma if else vapar shu like ke props.count === 0 che to pachi state jo va nu
    )
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItems) => total + cartItems.quantity * cartItems.price,
      0
    )
);


