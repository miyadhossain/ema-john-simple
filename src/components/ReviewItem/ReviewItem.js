import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  const reviewStyle = {
    borderBottom: "1px solid lightgray",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewStyle}>
      <h4 className="product-name">{name}</h4>
      <p>
        <small>${price}</small>
      </p>
      <p>Quantity: {quantity}</p>
      <br />
      <button onClick={() => props.removeProduct(key)} className="main-btn">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
