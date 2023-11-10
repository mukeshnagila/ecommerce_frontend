// cartActions.js
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const PLACE_ORDER = "PLACE_ORDER"; 

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const decreaseItemQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId,
});

export const removeItemFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const placeOrderAction = () => ({
  type: PLACE_ORDER,
});
