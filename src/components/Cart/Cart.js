import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const prodPrice = cart.reduce((price, prod) => price + prod.price, 0)
    // let total = 0;
    // cart.forEach(element => {
    //     total = total+ element.price;
    // });
    let shippingCost = 0;
    if (prodPrice > 35) {
        shippingCost = 0;
    }
    else if (prodPrice > 15) {
        shippingCost = 4.99;
    }
    else if (prodPrice > 0) {
        shippingCost = 12.99;
    }

    const tax = (prodPrice / 10).toFixed(2);
    console.log(tax);
    const grandTotal = (prodPrice + shippingCost + Number(tax));

    return (
        <div>
            <h4>Product summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Product price: {prodPrice}</p>
            <p><small>Shipping cost: {shippingCost}</small></p>
            <p>Vat & Tax: {tax}</p>
            <p>Total price: {grandTotal}</p>
        </div>
    );
};

export default Cart;