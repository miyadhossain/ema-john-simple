import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ product, addProduct, showAddToCart }) => {
  // console.log(props);
  const { name, img, seller, price, stock, key } = product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <br />
        <p>
          <small>By: {seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock</small>
        </p>
        {showAddToCart && (
          <button onClick={() => addProduct(product)} className="main-btn">
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
