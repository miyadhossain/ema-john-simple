import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import happyImage from "../../images/giphy.gif";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderdPlace, setOrderedPlace] = useState(false);

  //placed order
  const handlePlaceOrder = () => {
    setCart([]);
    setOrderedPlace(true);
    processOrder();
  };

  const removeProduct = (productKey) => {
    // console.log("remove clicked", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  useEffect(() => {
    // cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    // console.log(cartProducts);
    setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderdPlace) {
    thankYou = <img src={happyImage} alt="" />;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="main-btn">
            Place order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
