import React from "react";
import { NavLink, Link } from "react-router-dom";
import NavBar from "./navBar";

const Header = ({ user }) => {
  return (
    <header>
      <h1>sportify</h1>
      <NavBar user={user} />
    </header>
  );
};

export default Header;
