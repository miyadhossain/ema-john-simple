import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Header/Shop/Shop";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
export const userContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <userContext.Provider value={[logInUser, setLogInUser]}>
      <p>Email: {logInUser.email}</p>

      <Router>
        <Header />
        <Switch>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
