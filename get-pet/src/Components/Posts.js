import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import classes from "./Posts.module.css";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { FilterContext } from "./FilterContext";
import { updateLocale } from "moment";

const Posts = () => {
  const authCtx = useContext(AuthContext);
  const { filters } = useContext(FilterContext);
  const [likeList, setLikeList] = useState([]);
  const [posts, setPosts] = useState([]);
  const { updateFilters } = useContext(FilterContext);

  useEffect(() => {
    updateFilters({});
  }, []);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      fetchLikeList();
    }
  }, [authCtx.isLoggedIn,likeList]);

  useEffect(() => {
    getAllPost();
  }, [filters]);

  async function fetchLikeList() {
    try {
      const activationURL = `http://localhost:8080/likes/likesOf/${authCtx.userId}`;
      const res = await axios.get(activationURL);
      setLikeList([...res.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPost() {
    try {
      const activationURL = `http://localhost:8080/posts`;
      const res = await axios.get(activationURL);
      console.log(res);
      const filteredPosts = res.data.filter(
        (post) =>
          post.postType !== "question" &&
          (!filters.location || post.city === filters.location) &&
          (!filters.kind || post.kind === filters.kind) &&
          (!filters.minAge || post.age >= filters.minAge) &&
          (!filters.maxAge || post.age <= filters.maxAge) &&
          (!filters.specialNeed || post.specialNeeds === filters.specialNeed) &&
          (!filters.postType || post.postType === filters.postType) &&
          (!filters.startDate || post.startDate >= filters.startDate) &&
          (!filters.endDate || post.endDate <= filters.endDate)
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={classes.postContainer}>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          isFav={likeList.some((item) => item.postId === post.id)}
        />
      ))}
    </div>
  );
};

export default Posts;
