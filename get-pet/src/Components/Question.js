import classes from "./Question.module.css";
const Question = (props) => {
  return (
    <div className={classes.mainContainer}>
      <img
        className={classes.profilePic}
        src={require("../images/Group 13.png")}
      />
      <div
        className={
          props.isAnswer === true ? classes.replyContainer : classes.container
        }
        key={props.index}
      >
        <div className={classes.header}>
          <label className={classes.postTitle}>
            {!props.isAnswer ? props.title : props.userName}
          </label>

          {props.isAnswer === false && (
            <p className={classes.postDetails}>
              Kind: {props.kind ? props.kind : "All"}
            </p>
          )}
        </div>
        <p className={classes.content}>{props.content}</p>
        <p className={classes.time}>{props.date}</p>
        {/* <p className={classes.postDetails}></p> */}
      </div>
    </div>
  );
};

export default Question;
