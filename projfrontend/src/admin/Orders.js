import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getOrders } from "./helper/adminapicall";
 
const Orders = () => {

    const [orders, setOrders] = useState([]);

const token = isAuthenticated() && isAuthenticated().token;
const userId = isAuthenticated() && isAuthenticated().user._id;

const seeAllOrders=()=>{ 
  getOrders(userId, token).then((data) => {
   if (data.error) {
     console.log(data.error); 
   } else {
    //    console.log("data by vivek");
    //  console.log(data);
    //  console.log("data by vivek");
     setOrders(data);
    } 
 });
}

   return (
    <Base title="Welcome admin" description="Manage orders here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4 mt-3">All orders:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
           manage orders
           {seeAllOrders()}
           {orders.map((order,index)=>{
                return (
                 <div key={index}>
                  <h1>{order.amount}</h1>
                  </div>
               );
           })}
          </h2>
         </div>
      </div>
    </Base>
  );
};

export default Orders;





 

