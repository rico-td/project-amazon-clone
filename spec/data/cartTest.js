import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {

    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c7';

    beforeEach(() => {

        localStorage.clear();

        document.querySelector('.js-testing-container').innerHTML += `
        <div class="js-quantity-selector-${productId1}">
            <option value="1" selected>1</option>
        </div>`
       
        document.querySelector('.js-testing-container').innerHTML += `
        <div class="js-quantity-selector-${productId2}">
            <option value="1" selected>1</option>
        </div>`        
    });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(3);
  });
  
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    console.log( JSON.parse(localStorage.getItem('cart')))

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});