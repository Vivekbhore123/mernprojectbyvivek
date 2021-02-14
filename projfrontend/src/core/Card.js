import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import ImageHelper from './helper/ImageHelper';
import addItemToCart,{removeItemFromCart } from "./helper/cartHelper";

const Card=({
    product,
    addToCart=true,
    removeFromCart=false,
    setReload=f=>f,
    // setReload=function(f){return f},
    reload=false
})=> {

const [redirect, setRedirect] = useState(false);
const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name:"Default product from pixels"
    const cardDescription = product ? product.description:"Default description"
    const cardPrice = product ? product.price:"Default price"

const addToCartX=()=>{
    addItemToCart(product,()=>{
        setRedirect(true);
    })
}

    const getARedirect=(redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }
  
    const showAddToCart = (addToCart) => {
        if (addToCart){
          return (
            <button
              onClick={addToCartX}
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
          );
        }
    };
     const showRemoveFromCart = (removeFromCart) => {
       if (removeFromCart) {
         return (
           <button
             onClick={() => {
                 removeItemFromCart(product._id);
                 setReload(!reload);
             }}
             className="btn btn-block btn-outline-danger mt-2 mb-2"
           >
             Remove from cart
           </button>
         );
       }
     };

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product} />
          <p className="lead bg-success mt-2 font-weight-normal text-wrap">
            {cardDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">{showAddToCart(addToCart)}</div>
            <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
          </div>
        </div>
      </div>
    );
  }

export default Card;
