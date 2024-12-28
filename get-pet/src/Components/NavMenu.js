import classes from "./NavMenu.module.css";
import { Link } from "react-router-dom";

const NavMenu = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.navMenu}>
        <Link className={classes.link} to="/">
          Main Page
        </Link>
        <Link className={classes.link} to="/about">
          About
        </Link>
        <Link className={classes.link} to="/forum">
          Forum
        </Link>
        <Link className={classes.link} to="/FAQ">
          FAQ
        </Link>
      </div>
    </div>
  );
};
export default NavMenu;
