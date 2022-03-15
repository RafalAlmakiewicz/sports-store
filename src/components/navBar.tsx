import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../contexts/userContext";

const NavBar = () => {
  const { user } = useUser();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Products</NavLink>
        </li>
        {user ? (
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
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
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
