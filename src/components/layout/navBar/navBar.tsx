import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../../contexts/userContext";
import styles from "./navBar.module.scss";

const NavBar = () => {
  const { user, logOut } = useUser();

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <NavLink to="/products">Products</NavLink>
          <span className={styles.decorativeLine}></span>
        </li>
        {user ? (
          <>
            <li className={styles.user}>
              <FontAwesomeIcon icon="user-circle" />
              <span className={styles.decorativeLine}></span>
              <div className={styles.dropMenu}>
                <p className={styles.login}>{user.login}</p>
                <button onClick={logOut} className={`${styles.item} btn `}>
                  log out
                </button>
              </div>
            </li>
            <li className="user">
              <NavLink className={styles.item} to="/admin">
                admin panel
              </NavLink>
              <span className={styles.decorativeLine}></span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
              <span className={styles.decorativeLine}></span>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
              <span className={styles.decorativeLine}></span>
            </li>
          </>
        )}
        <li>
          <NavLink to="/cart" aria-label="cart">
            <FontAwesomeIcon icon="shopping-cart" />
          </NavLink>
          <span className={styles.decorativeLine}></span>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
