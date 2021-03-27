import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(
      "https://enigmatic-lowlands-57753.herokuapp.com/product/" + productKey
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);
  document.title = "Product Details";
  return (
    <div>
      <h1>Your product details</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
