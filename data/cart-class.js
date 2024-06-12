class Cart {
    
    cartItems;
    localStorageKey;

    constructor(localStorageKey) { 
        this.localStorageKey = localStorageKey;  
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
          quantity: 2,
          deliveryOptionId: '1'
        }];
      }
    };

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    };
    
    addToCart(productId) {
        let matchingItem;
      
        if (this.cartItems.length !== 0) {
            matchingItem = this.cartItems.find((item) => item.productId === productId);
        }
      
          const quantitySelector = document.querySelector(
              `.js-quantity-selector-${productId}`
          );
          
          const quantity = Number(quantitySelector.value);
       
      
        if (matchingItem) {
          matchingItem.quantity += quantity;
          quantitySelector.value = 1
        } else {
            this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
          });
          quantitySelector.value = 1
        }
        saveToStorage();
        return quantity;
    };

    removeFromCart(productId) {
          const newCart = [];
        
          this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
              newCart.push(cartItem);
            }
          });
        
          this.cartItems = newCart;
        
          saveToStorage();
    };
    
    getCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((item) => {
        cartQuantity += item.quantity;
        });
        return cartQuantity;  
    };
      
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        
        saveToStorage();
    }; 
}

const cart = new Cart('cart-oop')
const businessCart = new Cart('cart-business')

console.log(cart);
console.log(businessCart);  

console.log(businessCart instanceof Cart); 
