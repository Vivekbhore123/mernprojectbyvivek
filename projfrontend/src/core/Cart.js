import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart} from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import { isAuthenticated } from "../auth/helper";
// import { getProducts } from "./helper/coreapicalls";
import { Link } from "react-router-dom";
import Paymentb from "./Paymentb";



const Cart=()=> {
  // console.log("API IS", API);
const [products, setProducts] = useState([]);
const [reload, setReload] = useState(false); 

useEffect(() => {
   setProducts(loadCart());
}, [reload]);


// const loadAllProducts=()=>{
//     return isAuthenticated() ? (
//       <div>
//         <h2>this section is to load products</h2>
//         {products.map((product, index) => (
//           <Card
//             key={index}
//             product={product}
//             removeFromCart={true}
//             addToCart={false}
//             setReload={setReload}
//             reload={reload}
//           />
//         ))}
//       </div>
//     ) : (
//       <Link to="/signin">
//         <button className="btn btn-warning">Please signin first</button>
//       </Link>
//     );
// }



const loadAllProducts = (products) => {

  if (products !== undefined) {
    return (
      <div>
        <h2>this section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addToCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  }
  else{
    return(
      <div>
        <h1>Your cart is empty</h1>
      </div>
    )
  }
  
};

// const loadCheckout = () => {
//   return (
//     <div>
//       <h2>this section is for CheckOut</h2>
//     </div>
//   );
// };
  

  return (
    <Base title="Cart Page" description="Ready to CheckOut">
      <div className="row text-center text-capitalize">
        <div className="col-6">{loadAllProducts(products)}</div>
        <div className="col-6">
          {/* {loadCheckout()} */}
          <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
          <br />
          <br />
          <br />
          <Paymentb products={products} setReload={setReload} reload={reload} />
        </div>
      </div>
    </Base>
  );
}

export default Cart;
