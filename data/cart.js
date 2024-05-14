export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function getCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;  
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = cart.find((item) => item.productId === productId);

	const quantitySelector = document.querySelector(
		`.js-quantity-selector-${productId}`
	);
	
	const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
    quantitySelector.value = 1
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
    quantitySelector.value = 1
  }

  saveToStorage();
  return quantity;
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}