export const cart = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [];

export function saveCartInLocalStorage() {
	localStorage.setItem('cart', JSON.stringify(cart))	
}

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
	saveCartInLocalStorage()
	return quantity
}

export function removeFromCart(productId) {
	cart.map((item) => {
		if (item.productId === productId) {
			cart.splice(cart.indexOf(item), 1);
		}
	})
	saveCartInLocalStorage()
}

export function DeliveryDate(shippingType) {   
    const currentDay = dayjs();
    let deliveryDay;

    switch (shippingType) {
        case "normal":
            deliveryDay = currentDay.add(7, 'day');
            break;
        case "express":
            deliveryDay = currentDay.add(3, 'day');
            break;
        case "overnight":
            deliveryDay = currentDay.add(1, 'day');
            break;
        default:
            return "Invalid shipping type";
    }

    return deliveryDay.format('dddd, MMMM D');
}

