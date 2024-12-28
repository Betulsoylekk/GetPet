import Question from "./Question";
import classes from "./ForumPost.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const ForumPost = ({ item, index }) => {
  const [commentClicked, setCommentClicked] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const authCtx = useContext(AuthContext);
  useEffect(() => {}, [commentClicked]);

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

  const commentHandler = (item) => {
    console.log(item.id);
    if (commentClicked === false) {
      setCommentClicked(true);
      fetchAnswers(item.id);
    } else {
      setCommentClicked(false);
    }
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

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

  return (
    <div className={classes.li}>
      <Question
        id={item.id}
        index={index}
        title={item.title}
        content={item.content}
        postType={item.postType}
        kind={item.kind}
        isAnswer={false}
        date={calculateTimeAgo(item.creationTime)}
      />
      <img
        className={classes.commentIcon}
        src={require("../images/comment.png")}
        onClick={() => commentHandler(item)}
      />
      {commentClicked && (
        <div className={classes.answerContainer}>
          <div className={classes.replyBox}>
            <textarea
              id={`text-${index}`}
              key={`text-${index}`}
              rows="1"
              cols="50"
              value={text}
              className={classes.inputDetails}
              placeholder="Reply..."
              onChange={textChangeHandler}
            ></textarea>
            <img
              className={classes.replyIcon}
              onClick={() => submitHandler(item)}
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
      )}
    </div>
  );
};

export default ForumPost;
