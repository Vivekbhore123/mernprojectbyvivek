import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { getSingleCategory,updateThisCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const {user,token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
   loading: false,
    error: "",
    createdCategory: "",
    getaRedirect: false,
    
  });

  const {
    name,
    loading,
    error,
    createdCategory,
    getaRedirect,
    
  } = values;

  const preload = (categoryId) => { 
    getSingleCategory(categoryId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
         
          
        });
      }
    });
  };


  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
 console.log(`category id is ${match.params.categoryId}`);
  const latest = { name };
  console.log(latest);
    updateThisCategory(match.params.categoryId,user._id,token,latest).then(
      (data) => {
          console.log("see this one");
           console.log(`updated data= ${data}`);
           console.log("see this one");
           data = JSON.stringify(data);
           console.log("see this two");
           data = JSON.parse(data);
           console.log(data);
           console.log("see this two");
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            loading: false,
            createdCategory: data.name,
            
          });
        }
      }
    );
  };

  
  const handleChange = (name) => (event) => {
    const value =event.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: createdCategory ? "" : "none" }}
        className="alert alert-success mt-3"
      >
        <h4>{createdCategory} updated successfully</h4>
      </div>
    );
  };

  const warningMessage = () => (
    <div
      style={{ display: error ? "" : "none" }}
      className="alert alert-success mt-3"
    >
      <h4>updation failed</h4>
    </div>
  );

  const createCategoryForm = () => (
    <form>
      <div className="form-group mt-2">
          <input
            onChange={handleChange("name")}
            className="form-control"
            placeholder="Category"
            name="name"
            value={name}
          />
        
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mt-2 mb-2"
      >
        update Category
      </button>
    </form>
  );

  return (
    <Base
      title="update your category here"
      description="welcome to category updation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

// import React from 'react'

// function UpdateCategory() {
//     return (
//         <div>
//             <h1>hii from update category</h1>
//         </div>
//     )
// }

// export default UpdateCategory

