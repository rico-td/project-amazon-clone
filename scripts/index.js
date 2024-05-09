let productsHTML = '';

products.forEach((product) => {
   
productsHTML +=  `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name} 
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
      src="images/ratings/rating-${product.rating.stars * 10}.png">
 
      <div class="product-rating-count link-primary">
       ${product.rating.count} 
      </div>
    </div>

    <div class="product-price">
     ${(product.priceCents / 100).toFixed(2)}$
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-add-message-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
   `
   
})

document.querySelector('.products-grid')
	.innerHTML = productsHTML;


document.querySelectorAll('.add-to-cart-button')
    .forEach((button) => {

	let addedMessageTimeoutId;

  	button.addEventListener('click', () => {
		const {productId} = button.dataset;
			
		const messageElement = document.querySelector(`.js-add-message-${productId}`)
		messageElement.classList.add('added-to-card-visible')
		
		if (addedMessageTimeoutId) {
			clearTimeout(addedMessageTimeoutId)
		}

		const timeoutId = setTimeout(() => {
			messageElement.classList.remove('added-to-card-visible')
		}, 2000);
		
		addedMessageTimeoutId = timeoutId;

		let matchingItem; 
		card.forEach((item) => {

			if (productId === item.productId) {
				matchingItem = item
			}
		});

		const quantitySelector = document.querySelector(
			`.js-quantity-selector-${productId}`
		);
		
		const quantity = Number(quantitySelector.value);

		if (matchingItem) {
			
			matchingItem.quantity += quantity;
			quantitySelector.value = 1
		} else {
			card.push({
			productId,
			quantity
			});
			quantitySelector.value = 1
		}

		let cardQantity = 0

		card.forEach((item) => {
			cardQantity += item.quantity
			document.querySelector('.js-cart-quantity').innerHTML = cardQantity
		})

	});
});

    
