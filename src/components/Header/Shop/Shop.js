import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../../utilities/databaseManager";
import Cart from "../../Cart/Cart";
import Product from "../../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  document.title = "Shop";

  useEffect(() => {
    fetch("https://enigmatic-lowlands-57753.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://enigmatic-lowlands-57753.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleAddProduct = (pro) => {
    // console.log("product added", pro);
    const toBeAddedKey = pro.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      pro.quantity = 1;
      newCart = [...cart, pro];
    }
    setCart(newCart);
    addToDatabaseCart(pro.key, count);

    // const newCart = [...cart, pro];
    // setCart(newCart);
    // const sameProduct = newCart.filter((pd) => pd.key === pro.key);
    // const count = sameProduct.length;
    // addToDatabaseCart(pro.key, count);
  };
  return (
    <div className="twin-container">
      <div className="product-container">
        {products.length === 0 && <h1>Loadiing...</h1>}
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            addProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-btn">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
