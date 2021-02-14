import React,{useState,useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";


export default function Home() {
  // console.log("API IS", API);

const [products, setProducts] = useState([]);
const [error, setError] = useState(false);

const loadAllProducts=()=>{
  getProducts().then((data)=>{
    if(data.error){
      setError({error:data.error})
    }else{
      setProducts(data);
    }
  }
)
}

useEffect(() => {
 loadAllProducts();
}, []);

  return (
    <Base title="Home Page" description="descrptn-WELCOME TO THE TSHIRT STORE">
      <div className="row text-center text-capitalize">
        {/* <div className="col-4">
          <Card />
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div> */}
        <h1 className="text-white">
          All products
        </h1>
        <div className="row">
          {products.map((product,index)=>{
            return(
              <div key={index} className="col-4 mb-4">
                 <Card product={product}/>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  );
}
