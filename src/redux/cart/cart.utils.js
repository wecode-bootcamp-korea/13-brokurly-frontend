export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const toggleItemCheckBox = (cartItems, cartItemId) => {
  return cartItems.map((cartItem) => {
    if (cartItem.id === cartItemId) cartItem.checked = !cartItem.checked;
    return cartItem;
  });
};

export const checkAllSelectCheckBox = (cartItems) => {
  if (cartItems.length === 0) return false;
  return cartItems.every((cartItem) => cartItem.checked === true);
};

export const filterOutSelectedItems = (cartItems) => {
  return cartItems.filter((cartItem) => cartItem.checked !== true);
};
