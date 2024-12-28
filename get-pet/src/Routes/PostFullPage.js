import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import classes from "./PostFullPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePage from "./ProfilePage";
import Question from "../Components/Question";
import { AuthContext } from "../Components/AuthContext";
const PostFullPage = () => {
  const [currentPost, setCurrentPost] = useState();
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchPost();
  }, [params.listingId]);
  const textChangeHandler = (e) => {
    setText(e.target.value);
  };
  const calculateTimeAgo = (dateString) => {
    const currentDate = new Date();
    const previousDate = new Date(dateString);
    console.log("previous: ", previousDate);
    console.log("current: ", currentDate);

    const timeDiff = currentDate - previousDate;
    const secondsDiff = Math.floor(timeDiff / 1000);

    const years = Math.floor(secondsDiff / (365 * 24 * 60 * 60));
    const months = Math.floor(secondsDiff / (30 * 24 * 60 * 60));
    const days = Math.floor(secondsDiff / (24 * 60 * 60));
    const hours = Math.floor(secondsDiff / (60 * 60));
    const minutes = Math.floor(secondsDiff / 60);

    if (years > 0) {
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  };
  async function fetchPost() {
    try {
      const activationURL = `http://localhost:8080/posts/${params.listingId}`;
      const res = await axios.get(activationURL);
      setCurrentPost(res.data);
      fetchAnswers(res.data.id);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchAnswers = async (id) => {
    try {
      const activationURL = `http://localhost:8080/comments/commentsOf/${id}`;
      console.log(activationURL);
      const res = await axios.get(activationURL);
      console.log(res.data);
      setAnswers(res.data.reverse());
    } catch (e) {
      console.log(e.message);
    }
  };

  function goToUserProfile() {
    const userProfileURL = `/profile/${currentPost.user.id}`;
    navigate(userProfileURL);
  }
  const submitHandler = async (item) => {
    console.log("submitted");
    if (text !== "") {
      try {
        const activationURL = "http://localhost:8080/comments";
        console.log(item);

        const requestData = {
          userId: authCtx.userId,
          postId: item.id,
          text: text,
        };
        console.log(requestData);
        const res = await axios.post(activationURL, requestData);
        // Reset text state to empty string
        setText("");
        // Reload answers after successful post request
        fetchAnswers(item.id);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  if (!currentPost) {
    return <div>Loading...</div>;
  }
  return (
    <div className={classes.outerContainer}>
      <div className={classes.pageContainer}>
        <header>
          <h3 className={classes.mainHeader}>
            POST TITLE - {`${params.listingId}`}
          </h3>
        </header>

        <div className={classes.innerContainer}>
          <div className={classes.imgContainer}>
            <img
              className={classes.postImage}
              src={require(`../images/post_${currentPost.id}.jpg`)}
              alt="Post Image"
            />

            <div className={classes.details}>
              <label>Details</label>
              <p>{currentPost.content}</p>
            </div>
          </div>
          <div className={classes.filterContainer}>
            <div className={classes.filter}>
              <label>Location</label>
              <p>{currentPost.city}</p>
            </div>
            <div className={classes.filter}>
              <label>Kind</label>
              <p>{currentPost.kind}</p>
            </div>
            <div className={classes.filter}>
              <label>Age</label>
              <p>{currentPost.age}</p>
            </div>
            <div className={classes.filter}>
              <label>Special Needs</label>
              <p>{currentPost.specialNeeds}</p>
            </div>
            {currentPost.postType === "take care" && (
              <div className={classes.filter}>
                <label>Start Date</label>
                <p>{currentPost.startDate}</p>
              </div>
            )}
            {currentPost.postType === "take care" && (
              <div className={classes.filter}>
                <label>End Date</label>
                <p>{currentPost.endDate}</p>
              </div>
            )}
          </div>
          <div className={classes.profileContainer}>
            <img
              className={classes.profileImg}
              src={require("../images/profilePost.png")}
              alt="Profile Image"
              onClick={goToUserProfile}
            />
            <Link
              to={`/messages/${currentPost.user.id}`}
              className={classes.chatButton}
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.answerContainer}>
        <div className={classes.replyBox}>
          <textarea
            id={`text-${currentPost.id}`}
            key={`text-${currentPost.id}`}
            rows="1"
            cols="50"
            value={text}
            className={classes.inputDetails}
            placeholder="Reply..."
            onChange={textChangeHandler}
          ></textarea>
          <img
            className={classes.replyIcon}
            onClick={() => submitHandler(currentPost)}
            src={require("../images/sendIcon.png")}
          />
        </div>

        {answers.length !== 0 ? (
          answers.map((answer, index) => {
            return (
              <Question
                id={answer.id}
                key={index}
                content={answer.text}
                userName={answer.userName}
                isAnswer={true}
                date={calculateTimeAgo(answer.creationTime)}
              />
            );
          })
        ) : (
          <div className={classes.warning}>No comments</div>
        )}
      </div>
    </div>
  );
};

export default PostFullPage;
