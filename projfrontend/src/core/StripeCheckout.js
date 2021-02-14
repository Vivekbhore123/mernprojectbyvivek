import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import createOrder from "./helper/orderHelper";

const StripeCheckout=({products,setReload=f=>f,reload=false})=> {

 const [data, setData] = useState({
     loading:false,
     success:false,
     error:"",
     address:""
 });

 const token = isAuthenticated() && isAuthenticated().token;
 const userId = isAuthenticated() && isAuthenticated().user._id;

// const getFinalPrice=()=>{
//     return products.reduce((currentvalue,nextvalue)=>{
//         return currentvalue.price + (nextvalue.count * nextvalue.price);
//     },0)
// }

const getFinalPrice = () => {
  let amount=0;
if(products !== undefined){
      products.map((p) => {
        amount = amount + p.price;
      });
       return amount;
}else{
    return(
        <div>
            <h1>go and buy some fucking items</h1>
        </div>
    );
}
 
};

const makePayment = (token) => {
        const body = {
          token,
          products,
        };
        const headers = {
          "Content-Type": "application/json",
        };

        return fetch(`${API}/stripepayment`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        })
          .then((response) => {
            console.log("RESPONSE ", response);
            const { status } = response;
            console.log("STATUS ", status);
            //call further methods
            cartEmpty("dummy",()=>{
              console.log("cartEmpty function executed");
             });
             setReload(!reload);
          })
          .catch((error) => console.log(error));
}

const showStripeButton=()=>{
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51IFYyDJeQwewPCJVtvdpG2RLfNijVX7oFHF2hlHMGBUBhb1FYKjrfVmNzj8j9YN2FBOMOE0PrXnukg1c9jTwkWUV00bVLAxFI4"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="buy t-shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Please signin to checkout</button>
      </Link>
    );
}

    return (
      <div>
        <h2 className="text-white">
          Stripe checkout loaded {"  "}
          {getFinalPrice()}
          {"  "}
          {isAuthenticated() && products && showStripeButton()}
        </h2>
      </div>
    );
}

export default StripeCheckout;
