import DropIn from "braintree-web-drop-in-react";
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/PaymentBHelper";
import { createOrder } from "./helper/OrderHelper";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token)
      .then((info) => {
        // console.log();
        console.log("INFORMATION", info);

        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showBrainTreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              //   className="btn btn-block btn-outline-success"
              className="btn btn-block btn-success"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      // console.log(data);
      nonce = data.nonce;
      // let nonce = { data };
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("Payment Success");

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };

          createOrder(userId, token, orderData);

          // Removing the products after payment
          cartEmpty(() => {
            // console.log("Did we got a crash?");
          });

          // refreshing the page
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("Payment Failed");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>your bill is {getAmount()}$</h3>
      {showBrainTreeDropIn()}
    </div>
  );
};

export default PaymentB;
