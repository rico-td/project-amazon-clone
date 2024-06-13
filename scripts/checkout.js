import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';

import { loadCart } from '../data/cart.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';


async function loadPage() {

    await loadProductsFetch();
    // shortcut for 
    // loadProductsFetch().then(() => { ... } );

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();  
        });
    })

    // to safe the return value in a variable
    // const value = await new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();  
    //     });
    // })

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader(); 
}

loadPage();


// multiple promises at the same time   
// Promise.all([

//     // fetch is cleaner and gives a promise back
//     loadProductsFetch(),


    // new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();  
    //     });
    // })

// ]).then((values) => { 

//     console.log(values);
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader(); 
// }); 


// promises running one after another   
// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1');
//     });

// }).then((value) => {
//     return new Promise((resolve) => {

//         console.log(value);
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => { 
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader(); 
// }); 


// a lot of nesting so use Promises to fix this 
// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//         renderCheckoutHeader();
//     });
// });