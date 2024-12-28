import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { useState, useContext } from "react";
import NotificationsBar from "./NotificationsBar";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const MainHeader = () => {
  function goToMain() {
    window.location.href = "/";
  }
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  function logoutHandler() {
    authCtx.logout();
    navigate("/");
  }
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationHandler = () => {
    setShowNotifications(!showNotifications);
  };
  function goToLogin() {
    navigate("./login");
  }
  function goToProfile() {
    if (authCtx.isLoggedIn) {
      const userProfileURL = `/profile/${authCtx.userId}`;
      navigate(userProfileURL);
    } else {
      navigate("./login");
    }
  }
  const goToMessages = () => {
    if (authCtx.isLoggedIn) {
      navigate("/messages");
    } else {
      navigate("./login");
    }
  };
  return (
    <div className={classes.mainContainer}>
      <header className={classes.header}>
        <div className={classes.imgContainer}>
          <img
            className={classes.logoImg}
            alt="logo img"
            src={require("../images/578abc 1.png")}
          />
        </div>

        <div className={classes.heading} onClick={goToMain}>
          GetPet
        </div>
        <div className={classes.navContainer}>
          {/* <Link to="/create-post" className={classes.button}>
            New Post
          </Link> */}
          {authCtx.isLoggedIn && (
            <button
              className={classes.noftificationButton}
              onClick={notificationHandler}
            >
              <img
                className={classes.navImg}
                src={require("../images/bell-svgrepo-com.png")}
                alt="Notifications"
              />
            </button>
          )}

          {authCtx.isLoggedIn && (
            <button className={classes.navButton} onClick={goToMessages}>
              <img
                className={classes.navImg}
                src={require("../images/message-square-dots-svgrepo-com.png")}
                alt="Messages"
              />
            </button>
          )}

          <div className={classes.navButton}>
            <img
              className={classes.navImg}
              src={require("../images/profile-circle-svgrepo-com.png")}
              onClick={goToProfile}
              alt="Profile"
            />
            {!authCtx.isLoggedIn ? (
              <p className={classes.signIn} onClick={goToLogin}>
                Log in
              </p>
            ) : (
              <div className={classes.userContainer}>
                <p className={classes.signIn}>{authCtx.userName}</p>
                <p className={classes.signIn} onClick={logoutHandler}>
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
      <NotificationsBar show={showNotifications} />
    </div>
  );
};
export default MainHeader;
