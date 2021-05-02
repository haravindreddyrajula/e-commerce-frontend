import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadExistingCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
    // return products.reduce((currentValue, nextvalue) => {
    //   return currentValue + nextvalue.count * nextvalue;
    // }, 0);
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-block btn-success"> pay with stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-block btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout loaded {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
