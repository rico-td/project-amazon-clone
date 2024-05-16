import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'
import {loadFromStorage} from '../../data/cart.js';

describe('test suite: renderOrderSummary():', () => {

    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524';

    beforeEach(() => {

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          },
          {
            productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
            quantity: 2,
            deliveryOptionId: '1'
          }]);
        });
        loadFromStorage();  
    });

    afterEach(() => {
        localStorage.clear();
        // document.querySelector('.js-testing-container').innerHTML = '';
    });
    
    it('should render the order summary', () => {
        
        document.querySelector('.js-testing-container').innerHTML = 
        `
        <div class="js-order-summary"></div>

        `
        renderOrderSummary();

        expect(document.querySelector('.js-order-summary')).not.toBeNull();
        
   

    })
})