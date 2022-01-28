
export const QuantityCartItem = (cartItems, ItemToAdd) => {
 
  const existingElems = cartItems.find((elu) => elu._id === ItemToAdd._id);
  // console.log("KRish");
  if (existingElems) {
    const ItemIndex = cartItems.findIndex((elem) => elem._id === ItemToAdd._id);
    const newState = [...cartItems];
    newState[ItemIndex] = {
      ...newState[ItemIndex],
      quantity: newState[ItemIndex].quantity + 1,
    };
    
    
      // console.log(newState);
    return newState;
  }

  return [...cartItems, { ...ItemToAdd, quantity: 1 }];
};

export const CartItemDelete = (cartItems, ItemToDelete) => {
  
  const newCartItems = cartItems.filter((item) => item._id !== ItemToDelete._id);
  // console.log(newCartItems);
  return newCartItems;
};

export const CartItemless = (cartItem, ItemToDecrease) => {
  const existingElem = cartItem.find((item) => item._id === ItemToDecrease._id);
  // console.log(existingElem.quantity);
  if (existingElem.quantity === 1) {
    // console.log(existingElem.quantity)
    return CartItemDelete(cartItem, ItemToDecrease);
  }
  const ItemIndex = cartItem.findIndex((item) => item._id === ItemToDecrease._id);
  const newCartItems = [...cartItem];
  newCartItems[ItemIndex] = {
    ...newCartItems[ItemIndex],
    quantity: newCartItems[ItemIndex].quantity - 1,
  };
  return newCartItems;
};
