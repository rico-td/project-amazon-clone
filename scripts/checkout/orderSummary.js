import {cart, removeFromCart, updateDeliveryOption, saveToStorage} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
   
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${productId}">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents * cartItem.quantity)}
            </div>
            <div class="product-quantity js-product-quantity-${productId}">
              <span>
                Quantity: 
              </span>
                
                <select class="js-quantity-selector-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                  <option class="opt" value="1"  ${cartItem.quantity ===  1 ? 'selected' : ''}>1</option>
                  <option class="opt" value="2"  ${cartItem.quantity ===  2 ? 'selected' : ''}>2</option>
                  <option class="opt" value="3"  ${cartItem.quantity ===  3 ? 'selected' : ''}>3</option>
                  <option class="opt" value="4"  ${cartItem.quantity ===  4 ? 'selected' : ''}>4</option>
                  <option class="opt" value="5"  ${cartItem.quantity ===  5 ? 'selected' : ''}>5</option>
                  <option class="opt" value="6"  ${cartItem.quantity ===  6 ? 'selected' : ''}>6</option>
                  <option class="opt" value="7"  ${cartItem.quantity ===  7 ? 'selected' : ''}>7</option>
                  <option class="opt" value="8"  ${cartItem.quantity ===  8 ? 'selected' : ''}>8</option>
                  <option class="opt" value="9"  ${cartItem.quantity ===  9 ? 'selected' : ''}>9</option>
                  <option class="opt" value="10" ${cartItem.quantity === 10 ? 'selected' : ''}>10</option>
                </select>
              
              <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
              Update
            </span>
              <span class="js-delete-link-${matchingProduct.id} delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;

    });

 
    
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM, D'
      );

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }
  
  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;
  
  // handle delete Button in cart
    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
    });
    
    document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {

        const {productId, deliveryOptionId} = element.dataset;

        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
    
    document.querySelectorAll(`.js-update-quantity`)
      .forEach((element) => {
      element.addEventListener('click', () => {
        
        const productId = element.dataset.productId;
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)   
        let quantity = Number(quantitySelector.value);
      
    
        cart.forEach(item => {
          if (item.productId === productId) {
            item.quantity = quantity;
            saveToStorage();
          }
        });
        
      renderOrderSummary();
      renderCheckoutHeader();
      renderPaymentSummary();
       
      });
    })
  };
  
  
  console.assert.cartSummaryHTML



