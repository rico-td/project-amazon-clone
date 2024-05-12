export const cart = [{
	productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
	quantity: 1,
},
{
	productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
	quantity: 1,
},
{
	productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
	quantity: 1,
}]

export function addToCart(productId) {

	if (!productId) {
		console.error('addToCart: productId is missing');
		return false;
	}
	
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
		quantity
		});
		quantitySelector.value = 1
	}
	return quantity
}

export function removeFromCart(productId) {
	cart.map((item) => {
		if (item.productId === productId) {
			cart.splice(cart.indexOf(item), 1);
			document.querySelector('.').
		}
	})
}

