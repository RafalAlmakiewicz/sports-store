import React, { useState } from "react";
import "../styles.css";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">[Sports Store]</Link>
        </li>
        <li>
          <NavLink to="/">Products</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
        <li>
          <Link to="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
<h1 style={{ backgroubd: "tiel" }}>Navbar</h1>;
