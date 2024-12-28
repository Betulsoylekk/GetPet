import classes from "./Filters.module.css";
import { useState, useContext } from "react";
import { FilterContext } from "./FilterContext";
import { Link } from "react-router-dom";
const ForumFilter = () => {
  const [enteredKind, setEnteredKind] = useState("");
  const [enteredTopic, setEnteredTopic] = useState("");
  const { updateFilters } = useContext(FilterContext);

  const enteredKindHandler = (e) => {
    setEnteredKind(e.target.value);
    console.log(e.target.value);
  };

  const enteredTopicHandler = (e) => {
    setEnteredTopic(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Get the values of the user's input
    const topic = enteredTopic.trim();
    const kind = enteredKind.trim();
    // Create an object to store the filters
    const filters = {
      topic,
      kind,
    };
    updateFilters(filters);
  };
  return (
    <div className={classes.mainContainer}>
      <form className={classes.filterContainer} onSubmit={submitHandler}>
        <div className={classes.filter}>
          <select onChange={enteredTopicHandler} value={enteredTopic}>
            <option value="" disabled hidden>
              Topic
            </option>
            <option value="">All</option>
            <option value="diet">Diet</option>
            <option value="vaccination">Vaccination</option>
            <option value="behaviour">Behaviour</option>
            <option value="vet">Vet Recommendations</option>
          </select>
        </div>

        <div className={classes.filter}>
          <select onChange={enteredKindHandler} value={enteredKind}>
            <option value="" disabled hidden>
              Kind
            </option>
            <option value="">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          className={classes.filterButton}
          onClick={submitHandler}
          type="submit"
        >
          <ion-icon
            className={classes.filterIcon}
            name="checkmark-circle"
          ></ion-icon>
        </button>
      </form>
      <Link className={classes.newPostButton} to="/addQuestion">
        <img
          className={classes.addQuestionImg}
          src={require("../images/write-svgrepo-com.png")}
        />
      </Link>
    </div>
  );
};
export default ForumFilter;
