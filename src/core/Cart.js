import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadExistingCart } from "./helper/CartHelper";
import PaymentB from "./PaymentB";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadExistingCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className="">
        <h2>loading</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>section is for checkout</h2>
      </div>
    );
  };

  {
    /*                                                             braintree payment code                                       */
  }
  return (
    <Base title="Cart page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No products to show in cart</h3>
          )}
        </div>
        <div className="col-6">
          <PaymentB products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
  {
    /*                                                             Stripe Payment Code
   return (
     <Base title="Cart page" description="Ready to Checkout">
       <div className="row text-center">
         <div className="col-6">
           {products.length > 0 ? (
             loadAllProducts(products)
           ) : (
             <h3>No products to show in cart</h3>
           )}
         </div>
          <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div> 
       </div>
     </Base>
      ); */
  }
};

export default Cart;
