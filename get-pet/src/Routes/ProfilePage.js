import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import classes from "./ProfilePage.module.css";
import { AuthContext } from "../Components/AuthContext";
import Post from "../Components/Post";
import ForumPost from "../Components/ForumPost";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authCtx = useContext(AuthContext);

  const userID = id;
  console.log(userID);
  console.log(authCtx.userId);

  const [likeList, setLikeList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchLikeList();
  }, []);

  useEffect(() => {
    getData();
  }, [userID, likeList]);

  async function fetchLikeList() {
    try {
      const activationURL = `http://localhost:8080/likes/likesOf/${userID}`;
      const res = await axios.get(activationURL);
      setLikeList([...res.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const userResponse = await axios.get(
        "http://localhost:8080/users/allUsers"
      );
      const currentUser = userResponse.data.find((user) => user.id == userID);
      setUser(currentUser);

      const postsResponse = await axios.get("http://localhost:8080/posts");
      const filteredPosts = postsResponse.data.filter(
        (post) => post.user.id == userID && post.postType !== "question"
      );

      const filteredLikedPosts = postsResponse.data.filter(
        (post) =>
          post.postType !== "question" &&
          likeList.some((item) => item.postId === post.id)
      );

      const filteredQuestions = postsResponse.data.filter(
        (post) => post.user.id == userID && post.postType === "question"
      );

      setPosts(filteredPosts);
      setLikedPosts(filteredLikedPosts);
      setQuestions(filteredQuestions.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function goToCompleteProfilePage() {
    navigate("/completeProfile");
  }
  console.log(user);

  return (
    <div className={classes.mainContainer}>
      {userID == authCtx.userId && (
        <h1
          onClick={goToCompleteProfilePage}
          className={classes.completeProfile}
        >
          Click Here To Complete Your Profile!
        </h1>
      )}

      {user && (
        <div className={classes.profileContainer}>
          <p>ID: {user.id}</p>
          {user.userName && <p>Username: {user.userName}</p>}

          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <h1 className={classes.heading}>
        {authCtx.userId == userID ? `Your Posts` : `${user?.userName}'s Posts`}
      </h1>
      <div className={classes.postContainer}>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            className={classes.post}
            isFav={questions.some((item) => item.postId === post.id)}
          />
        ))}
      </div>

      {authCtx.userId == userID && (
        <>
          <h1 className={classes.heading}>You Liked</h1>
          <div className={classes.postContainer}>
            {likedPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                isFav={likeList.some((item) => item.postId === post.id)}
              />
            ))}
          </div>
        </>
      )}

      <h1 className={classes.heading}>
        {authCtx.userId == userID
          ? `Your Questions`
          : `${user?.userName}'s Questions`}
      </h1>
      <div className={classes.questionContainer}>
        {questions.map((item, index) => (
          <ForumPost item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
