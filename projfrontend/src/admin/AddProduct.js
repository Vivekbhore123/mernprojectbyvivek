import React, { useState,useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { getCategories,createaProduct } from "./helper/adminapicall";


const AddProduct = () => {
    const { user, token } = isAuthenticated(); 

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;

const preload=()=>{
    getCategories().then(data=>{
         
        if(data.error){
            setValues({...values,error:data.error})
        }else{
            setValues({...values,categories:data,formData:new FormData()})
            console.log(categories)
        }
    })
}
useEffect(() => {
   preload();
}, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, token, formData).then((data) => {
       
      if (data.error) {
        setValues({ ...values, error: data.error })
    
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
        //   getaRedirect:true,
          createdProduct: data.name
        });
      }
    });
  };


// const performRedirect = () => {
//     <div
//       style={{ display: createdProduct ? "" : "none" }}
//       className="alert alert-success mt-3"
//     >
//       <h4>{createdProduct} created successfully</h4>
//     </div>;
//   if (getaRedirect) {
//       setTimeout(()=>{
//         return <Redirect to="/admin/dashboard" />;
//         },2000);
//      }
//  };

  const handleChange = (name) => (event) => {
    const value=name==="photo" ? event.target.files[0] : event.target.value
    formData.set(name,value);
    setValues({...values,[name]:value});
  };

const successMessage = () => (
  <div
    style={{ display: createdProduct ? "" : "none" }}
    className="alert alert-success mt-3"
  >
    <h4>
      {createdProduct} created successfully 
    </h4>
  </div>
  
);

const warningMessage = () => (
  <div
    style={{ display: error ? "" : "none" }}
    className="alert alert-success mt-3"
  >
    <h4>product not created</h4>
  </div>
);

  const createProductForm = () => (
    <form>
      <span className="mt-2">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success mt-2 ">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mt-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && categories.map((cate,index) => <option key={index} value={cate._id}>{cate.name}</option>)}
        </select>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mt-2 mb-2"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="add product here"
      description="welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {/* {performRedirect()} */}
          {warningMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
