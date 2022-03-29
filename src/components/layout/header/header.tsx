import { Link } from "react-router-dom";
import NavBar from "../navBar/navBar";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">sportify</Link>
      </h1>
      <NavBar />
    </header>
  );
};

export default Header;
