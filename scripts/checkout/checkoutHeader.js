import { getCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
    
    document.querySelector('.checkout-header-middle-section').innerHTML = `

        Checkout (<a class="return-to-home-link"
        href="index.html">${getCartQuantity()}  items</a>)
    `;
}

