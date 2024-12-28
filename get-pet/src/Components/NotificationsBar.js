import classes from "./NotificationsBar.module.css";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationsBar = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (props.show) {
      fetchNotifications();
    }
  }, [props.show]);

  async function fetchNotifications() {
    try {
      const activationURL = `http://localhost:8080/notifications/${authCtx.userId}`;
      const res = await axios.get(activationURL);
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const notificationHandler = (notification) => {
    console.log(notification);
    if (notification.post.postType !== "question") {
      console.log("yes");
      navigate(`/listings/${notification.post.id}`);
    } else {
      navigate(`/questions/${notification.post.id}`);
    }
  };

  function checkSubstring(string, substring) {
    return string.includes(substring);
  }

  return (
    props.show && (
      <div className={classes.container}>
        <div className={classes.notificationList}>
          <div className={classes.header}>Notifications</div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={classes.notificationContainer}
                onClick={() => {
                  notificationHandler(notification);
                }}
              >
                <div className={classes.notification}>
                  {notification.message}
                </div>
                <div>
                  {checkSubstring(notification.message, "liked") ? (
                    <ion-icon
                      className={classes.heartIcon}
                      name="heart-outline"
                    ></ion-icon>
                  ) : (
                    <img
                      className={classes.commentIcon}
                      src={require("../images/comment.png")}
                      alt="comment"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={classes.warning}>No notifications.</div>
          )}
        </div>
      </div>
    )
  );
};

export default NotificationsBar;
