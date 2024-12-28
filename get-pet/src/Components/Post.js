import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import classes from "./Post.module.css";
import axios from "axios";

const Post = (props) => {
  const authCtx = useContext(AuthContext);
  const [isFav, setIsFav] = useState(props.isFav);
  const navigate = useNavigate();
  async function likeHandler() {
    try {
      const activationURL = "http://localhost:8080/likes";
      const requestData = {
        userId: authCtx.userId,
        postId: props.post.id,
      };
      const res = await axios.post(activationURL, requestData);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteLikeHandler() {
    try {
      const activationURL = `http://localhost:8080/likes/${authCtx.userId}/${props.post.id}`;
      await axios.delete(activationURL);
    } catch (error) {
      console.log(error);
    }
  }
  async function favHandler() {
    if (authCtx.isLoggedIn && !isFav) {
      likeHandler();
      setIsFav(true); // Update the favorite status to true
    } else if (isFav) {
      deleteLikeHandler();
      setIsFav(false); // Update the favorite status to false
    } else {
      navigate("./login");
    }
  }

  return (
    <div className={classes.post}>
      <Link to={`/listings/${props.post.id}`} className={classes.link}>
        <div className={classes.imgContainer}>
          <img
            className={classes.img}
            src={require(`../images/post_${props.post.id}.jpg`)}
            alt="Post Image"
          />
        </div>

        <div className={classes.info}>
          <label className={classes.label}>
            {props.post.postType.toUpperCase()}
          </label>
          <div className={classes.details}>
            <p>{props.post.title.toUpperCase()}</p>

            <p>Like Count: {props.post.likeCount}</p>
          </div>
        </div>
      </Link>
      <div onClick={favHandler} className={classes.fav}>
        {isFav ? (
          <ion-icon className={classes.heartIcon} name="heart"></ion-icon>
        ) : (
          <ion-icon
            className={classes.heartIcon}
            name="heart-outline"
          ></ion-icon>
        )}
      </div>
    </div>
  );
};

export default Post;
