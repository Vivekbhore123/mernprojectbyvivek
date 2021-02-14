import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

const successMessage=()=>{
  if(success){
    return (
      <h4 className="text-success">Category added successfully</h4>
    )
  }
}


const warningMessage = () => {
  if (error) {
    return <h4 className="text-success">failed to add Category</h4>;
  }
};

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //firing request to the backend
    createCategory(user._id,token,{name})
    .then((data)=>{
      if(data.error){
        setError(true);
      }
      else{
        setError("");
        setSuccess(true);
        setName("");
        // alert("category added successfully");
      }
    })
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">
          <b>Enter the category</b>
        </p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  return (
    <div>
      <Base
        title="welcome to category section"
        description="manage the categories of t-shirt here"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default AddCategory;
