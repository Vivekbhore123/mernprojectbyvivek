import React from "react";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base"; 
import { Link } from "react-router-dom";   

const AdminDashboard = () => {
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage orders 
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span
              style={{ backgroundColor: "green" }}
              className="badge badge-success mr-2"
            >
              Name:
            </span>
            <span style={{ marginLeft: "10px" }}>{name}</span>
          </li>
          <li className="list-group-item">
            <span
              style={{ backgroundColor: "green" }}
              className="badge badge-success mr-2"
            >
              E-mail:
            </span>
            <span style={{ marginLeft: "10px" }}>{email}</span>
          </li>
          <li className="list-group-item">
            <span style={{ backgroundColor: "violet" }} className="badge badge-danger">Admin area</span>
          </li>
        </ul>
      </div>
    );
  };

  const {
    user: { name, email, role },
  } = isAuthenticated();

  return (
    <Base
      title="Welcome to admin area"
      description="manage your products here"
      className="p-4 container bg-success"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9"> {adminRightSide()}</div>
      </div>
    </Base>
  );
};


export default AdminDashboard;





