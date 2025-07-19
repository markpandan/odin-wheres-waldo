import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className={`container ${styles.navbarContainer}`}>
        <div>
          <NavLink to={"/"} className={`${styles.navbarTitle}`}>
            <h1>Where's Waldo</h1>
          </NavLink>
        </div>
        <ul className={styles.navbarNav}>
          <Link to={"/highscores"}>
            <li className={styles.navItem}>High Scores</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
