import { cart, removeFromCart, DeliveryDate } from "../data/cart.js";
import {products} from "../data/products.js";
import { formatPrice } from "../utils/money.js";


let cartHTML = "";
let productId; 

cart.forEach(item => {

    productId = item.productId
    let matchingItem;

    products.forEach(product => {
        if (product.id === productId) {
            matchingItem = product;
        }
    });
       
    cartHTML += `
        <div class="cart-item-container js-item-container-${matchingItem.id}">
            <div class="delivery-date">
            Delivery date: ${DeliveryDate('normal')} 
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingItem.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                $${formatPrice(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>

                <div class="delivery-option">
                <input type="radio" class="delivery-option-input js-delivery-options-${productId}"
                    name="${productId}">
                <div>
                    <div class="delivery-option-date">
                   ${DeliveryDate('normal')} 
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio" class="delivery-option-input js-delivery-options-${productId}"
                name="${productId}">
                <div>
                    <div class="delivery-option-date">
                    ${DeliveryDate('express')} 
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - express shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input checked type="radio" class="delivery-option-input js-delivery-options-${productId}"
                name="${productId}">
                <div>
                    <div class="delivery-option-date">
                    ${DeliveryDate('overnight')} 
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - overnight shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
`;
})

document.querySelector(".js-order-summary").innerHTML = cartHTML;


document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
    link.addEventListener('click', () => {

        productId = link.dataset.productId;
        removeFromCart(productId)
        document.querySelector(`.js-item-container-${productId}`).remove(); 
    });
})  
*