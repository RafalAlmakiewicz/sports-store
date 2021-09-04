import React, { useState } from "react";
import "../styles.css";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">[Sports Store]</Link>
        </li>
        <li>
          <NavLink to="/">Products</NavLink>
        </li>
        {!user && (
          <React.Fragment>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li>{user.login}</li>
            <li>
              <NavLink to="/logout">Log out</NavLink>
            </li>
          </React.Fragment>
        )}

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
