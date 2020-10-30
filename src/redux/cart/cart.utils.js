export const increaseItemAmount = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === cartItemToAdd.product_id
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

export const checkAddItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === cartItemToAdd.product_id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product_id === cartItemToAdd.product_id
        ? { ...cartItem, quantity: cartItem.quantity + cartItemToAdd.quantity }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: cartItemToAdd.quantity }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product_id === cartItemToRemove.product_id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.product_id !== cartItemToRemove.product_id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.product_id === cartItemToRemove.product_id
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

export const filterOutSoldoutItems = (cartItems) => {
  return cartItems.filter((cartItem) => cartItem.sold_out === false);
};

export const filterOutCheckOutCheckedItems = (cartItems) => {
  return cartItems.filter((cartItem) => cartItem.checked !== true);
};

export const checkDiscountTotalPrice = (cartItems) =>
  cartItems.reduce(
    (acc, cartItem) =>
      cartItem.discount_price !== cartItem.price && cartItem.checked
        ? acc + (cartItem.price - cartItem.discount_price) * cartItem.quantity
        : acc,
    0
  );
