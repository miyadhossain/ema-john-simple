import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import happyImage from "../../images/giphy.gif";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderdPlace, setOrderedPlace] = useState(false);
  const history = useHistory();

  //placed order
  const handleProceedCheckout = () => {
    history.push("/shipment");
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
    fetch("http://localhost:5000/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
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
          <button onClick={handleProceedCheckout} className="main-btn">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
