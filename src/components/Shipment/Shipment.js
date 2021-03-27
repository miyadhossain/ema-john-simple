import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [logInUser, setLogInUser] = useContext(userContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...logInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };
    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("order placed successfully");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={logInUser.name}
        name="name"
        ref={register({ required: true })}
        placeholder="Your Name"
      />
      {errors.name && <span className="error">The Name is required</span>}
      <input
        defaultValue={logInUser.email}
        name="email"
        ref={register({ required: true })}
        placeholder="Your Email"
      />
      {errors.email && <span className="error">The Email is required</span>}
      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Your Address"
      />
      {errors.address && <span className="error">The Address is required</span>}
      <input
        name="phone"
        ref={register({ required: true })}
        placeholder="Your Phone number"
      />
      {errors.phone && <span className="error">The Phone is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;
