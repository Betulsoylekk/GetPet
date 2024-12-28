import { Outlet } from "react-router-dom";
import MainHeader from "../Components/MainHeader";
import NavMenu from "../Components/NavMenu";
import classes from "./RootLayout.module.css";
const RootLayout = () => {
  return (
    <>
      <MainHeader />
      <div className={classes.currentPage}>
        <NavMenu className={classes.navMenu} />
        <Outlet />
      </div>
    </>
  );
};
export default RootLayout;
