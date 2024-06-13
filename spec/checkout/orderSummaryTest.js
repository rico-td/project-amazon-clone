import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import {loadFromStorage} from '../../data/cart.js';
import { cart } from '../../data/cart.js';
import { loadProducts } from '../../data/products.js';

document.addEventListener('DOMContentLoaded', () => {  
  describe('test suite: renderOrderSummary():', () => {

    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524';

    const testingContainer = document.querySelector('.js-testing-container');

    beforeAll((done) => { 
      loadProducts(() => {
        done();
      });
    })

    beforeEach(() => {

      spyOn(localStorage, 'setItem');

      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: '1'
        }]);
      });
      
      testingContainer.innerHTML = 
      `
      
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="checkout-header-middle-section"></div>
  
          <select class="js-quantity-selector-${productId1}">
            <option selected value="1">1</option>
            <option value="2">2</option>
          </select>

          <select class="js-quantity-selector-${productId2}">
            <option value="1">1</option>
            <option selected value="2">2</option>
          </select>
  
      `
      loadFromStorage();  
      renderOrderSummary();
    });

    afterEach(() => { 
      localStorage.clear(); 
      testingContainer.innerHTML = ''; 

    })

    it('renders the cart', () => {
    
      // checkes the cart quantity after rendering first
      expect(
        document.querySelectorAll('.js-cart-item-container')
        .length).toEqual(2);

      // checkes correct product name in cart
      expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
      expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black');
   
      // triggers change event to update selected quantity for productId1
      const selectElementProductId1 = document.querySelector(`.js-quantity-selector-${productId1}`);
      selectElementProductId1.value = '1';
      selectElementProductId1.dispatchEvent(new Event('change'));
    
      // triggers change event to update selected quantity for productId2
      const selectElementProductId2 = document.querySelector(`.js-quantity-selector-${productId2}`);
      selectElementProductId2.value = '2';
      selectElementProductId2.dispatchEvent(new Event('change'));
    
      // checkes selected quantity for productId1
      const selectedQuantityProductId1 = selectElementProductId1.value;
      expect(selectedQuantityProductId1).toEqual('1');
    
      // checkes selected quantity for productId2
      const selectedQuantityProductId2 = selectElementProductId2.value;
      expect(selectedQuantityProductId2).toEqual('2');
    })

    it ('removes a product', () => {

      // clicks the delete button for productId1
      const deleteBtn = document.querySelector(`.js-delete-link-${productId1}`)
      deleteBtn.click(); 
     
      // checkes the cart quantity after deleting one of them 
      const containerCart =  document.querySelectorAll('.js-cart-item-container')
      expect(containerCart.length).toEqual(1);
      
      // checkes if first item is deleted
      let itemContainer = document.querySelector(`.js-cart-item-container-${productId1}`)
      expect(itemContainer).toEqual(null);

      // checkes if second item is still in cart
      itemContainer = document.querySelector(`.js-cart-item-container-${productId2}`)
      expect(itemContainer).not.toEqual(null)

      // checkes the cart after deleting the first item 
      expect(cart.length).toEqual(1);
      expect(cart[0].quantity).toEqual(2);
      expect(cart[0].productId).toEqual(productId2);
    })
  })
})

