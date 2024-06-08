import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import {loadFromStorage} from '../../data/cart.js';


document.addEventListener('DOMContentLoaded', () => {  
  describe('test suite: renderOrderSummary():', () => {

    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524';

    const htmlContainer = document.querySelector('.js-testing-container');

    const nameHtml1 = document.querySelector(`.js-product-name-${productId1}`); 
    const quantityHtml1 = document.querySelector(`.js-product-quantity-${productId1}`); 
    
    const nameHtml2 = document.querySelector(`.js-product-name-${productId2}`); 
    const quantityHtml2 = document.querySelector(`.js-product-quantity-${productId2}`); 

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
      
      htmlContainer.innerHTML = 
      `
      
        <div class="js-order-summary"></div>
          <select class="js-quantity-selector-${productId1}">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

          <select class="js-quantity-selector-${productId2}">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
  
      `
      loadFromStorage();  
      renderOrderSummary();
    });

    afterEach(() => { 
      localStorage.clear(); 
      htmlContainer.innerHTML = ''; 

    })

    it('renders the cart', () => {
    
      expect(
        document.querySelectorAll('.js-cart-item-container')
        .length).toEqual(2);

      // checking quantity of each product in cart
      expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText)
      .toContain('1');
      expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText)
      .toContain('2');

      // checking correct product name in cart
      expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
      
      expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black');
    })
  })
});