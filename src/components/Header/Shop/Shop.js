import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../../fakeData";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../../utilities/databaseManager";
import Cart from "../../Cart/Cart";
import Product from "../../Product/Product";
import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousProduct = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    // console.log(productKeys);
    setCart(previousProduct);
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
