import React from "react";
import Menu from "./Menu"; 
import logo from "./logo.jpeg";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <div className="row">
          <div className="col-md-2">
            <img src={logo} alt="logo" style={{width:"130px",height:"130px"}}/>
          </div>
          <div className="col-md-10">
            <h2 className="display-4">{title}</h2>
          </div>
        </div>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>

    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
