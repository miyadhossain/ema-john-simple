import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  const [logInUser, setLogInUser] = useContext(userContext);
  document.title = "Ema-John";
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory here</Link>
        <button onClick={() => setLogInUser({})}>Sign out</button>
      </nav>
    </div>
  );
};

export default Header;
