import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Components/AuthContext";
import { FilterContext } from "../Components/FilterContext";
import classes from "./Forum.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ForumPost from "../Components/ForumPost";
import ForumFilter from "../Components/ForumFilter";
export default function Forum() {
  const authCtx = useContext(AuthContext);
  const { filters } = useContext(FilterContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAllQuestionPosts(); // GET isteğini gönder
  }, [filters]);

  async function getAllQuestionPosts() {
    try {
      const activationURL = `http://localhost:8080/posts`;
      const res = await axios.get(activationURL);
      const filteredPosts = res.data.filter(
        (post) =>
          post.postType === "question" &&
          (!filters.kind || post.kind === filters.kind) &&
          (!filters.topic || post.topic === filters.topic)
      );
      setQuestions(filteredPosts.reverse());
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className={classes.mainContainer}>
      <ForumFilter />

      <div className={classes.container}>
        {/* <div className={classes.divContainer}>
          <label className={classes.label}>Title</label>
          <select>
            <option>Diet</option>
            <option>Vaccination</option>
            <option>Behaviour</option>
            <option>Vet Recommendations</option>
          </select>
        </div>
        <div className={classes.divContainer}>
          <label className={classes.label}>Kind</label>
          <select>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="bird">Bird</option>
          </select>
        </div>

        <button className={classes.applyFilterButton}>Apply Filters</button> */}

        <ul className={classes.ul} type="none">
          {questions.map((item, index) => (
            <ForumPost item={item} index={index} />
          ))}
          {questions.length == 0 && (
            <div className={classes.warningContainer}>
              <h1 className={classes.warning}>No Questions Found</h1>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
