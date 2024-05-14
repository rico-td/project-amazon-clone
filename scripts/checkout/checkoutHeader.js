import { getCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {

    console.log(getCartQuantity())
    document.querySelector('.checkout-header-middle-section').innerHTML = `

        Checkout (<a class="return-to-home-link"
        href="index.html">${getCartQuantity()}  items</a>)
    `;
}

