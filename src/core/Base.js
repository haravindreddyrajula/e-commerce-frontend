import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu></Menu>
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      {/* <p>This is main content</p> */}
      <div className={className}>{children}</div>
    </div>
    {/* <footer.footer.bg-dark.mt-auto.py-3 */}
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-whiter text-center py-3">
        <h4>Any Queries, feel free to reach us</h4>
        <button className="btn btn-warning btn-lg">Contact US</button>
      </div>
      <div className="container-fluid">
        <span className="text-muted">
          A <span className="text-white">MERN </span> Stack Project
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
