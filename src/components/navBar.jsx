import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = ({ user }) => {
  return (
    <nav>
      <ul>
        {user ? (
          <React.Fragment>
            <li className="user">
              <FontAwesomeIcon icon="user-circle" />
              <p>{user.login}</p>
              <div className="drop-menu">
                <NavLink className="drop-menu-item" to="/admin">
                  admin
                </NavLink>
                <NavLink className="drop-menu-item" to="/logout">
                  log out
                </NavLink>
              </div>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </React.Fragment>
        )}
        <li>
          <Link to="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
