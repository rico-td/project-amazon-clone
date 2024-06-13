import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

import { loadCart } from '../data/cart.js';


async function loadPage() {

    try {   

        // throw new Error('error1');

        await loadProductsFetch();

        await new Promise((resolve, reject) => {

            // throw 'error2'
            loadCart(() => {

                // reject('error3');
                resolve();  
            });
        }) 
    } catch (error) {   
        console.log('an error has occurred');
    } 

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader(); 
    }

loadPage();
