import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart()', () => {

    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    let productId2 = '0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524';

    beforeEach(() => {

        localStorage.clear();

        document.querySelector('.js-testing-container').innerHTML += 
        `
        <div class="js-testSuite">
          <select class="js-quantity-selector-${productId1}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
         
          </select>
          <select class="js-quantity-selector-${productId2}">
            <option value="1">1</option>
            <option value="2">1</option>
            <option value="3">1</option>
        
          </select>
        </div>
        `
        
      });

      afterEach(() => { 
        document.querySelector('.js-testing-container').innerHTML = '';
      });
      
  it('adds an already existing product to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(3);
  });

  it('adds a new product to an existing cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
    addToCart(productId2);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[1].quantity).toEqual(1);
  });

  it('adds a new product to an empty cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart(productId2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(cart[0].quantity).toEqual(1);
  });
});
