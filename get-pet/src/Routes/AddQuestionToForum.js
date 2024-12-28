import { useContext, useState } from "react";
import classes from "./AddQuestionToForum.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
import axios from "axios";
export default function AddQuestionToForum() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [question, setQuestion] = useState();
  const [photo, setPhoto] = useState();
  const [valid, setValid] = useState(true);
  const [isMissingVariables, setIsMissingVariables] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredKind, setEnteredKind] = useState("All");
  const [enteredTopic, setEnteredTopic] = useState("Diet");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(enteredTitle, question, enteredTopic, enteredKind);

    if (enteredTitle && question && enteredTopic && enteredKind) {
      try {
        const activationURL = "http://localhost:8080/posts/createQuestion";

        const longValue = parseFloat(authCtx.userId, 10);
        console.log(longValue);

        const requestData = {
          userId: longValue,
          content: question,
          title: enteredTitle,
          topic: enteredTopic,

          // kind: enteredKind,
        };
        const res = await axios.post(activationURL, requestData);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setIsMissingVariables(true);
    }
  };
  function topicHandler(e) {
    setEnteredTopic(e.target.value);
  }
  function kindChangeHandler(e) {
    setEnteredKind(e.target.value);
  }
  function questionHandler(e) {
    setQuestion(e.target.value);
  }
  function titleChangeHandler(e) {
    setEnteredTitle(e.target.value);
  }
  function uploadDocumentHandler(e) {
    e.preventDefault();

    const formData = new FormData();

    const fileInput = document.querySelector('input[type="file"]');
    formData.append("image", fileInput.files[0]);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Yükleme işlemi tamamlandı: ", data);
        setPhoto(data);
      })
      .catch((error) => {
        console.error("Yükleme işlemi sırasında bir hata oluştu: ", error);
      });
  }

  return (
    <div className={classes.mainContainer}>
      {isMissingVariables && <h1>Please Complete All Fields</h1>}
      <h3 className={classes.mainHeader}>Add A Question</h3>
      <form onSubmit={submitHandler} className={classes.listingContainer}>
        <div className={classes.divContainer}>
          <label className={classes.label}>Title</label>
          <textarea
            className={classes.inputDetails}
            value={enteredTitle}
            onChange={titleChangeHandler}
            rows="1"
            cols="50"
          ></textarea>
        </div>
        <div className={classes.divContainer}>
          <label className={classes.label}>Enter Your Question:</label>
          <textarea
            className={classes.inputDetails}
            value={question}
            onChange={questionHandler}
            rows="5"
            cols="100"
          ></textarea>
        </div>
        <div className={classes.divContainer}>
          <label className={classes.label}>Kind</label>
          <select value={enteredKind} onChange={kindChangeHandler}>
            <option value="All">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={classes.divContainer}>
          <label className={classes.label}>Topic</label>
          <select value={enteredTopic} onChange={topicHandler}>
            <option value="diet">Diet</option>
            <option value="vaccination">Vaccination</option>
            <option value="behaviour">Behaviour</option>
            <option value="vet recommendations">Vet Recommendations</option>
          </select>
        </div>

        <div className={classes.buttonContainer}>
          <button className={classes.submitButton} type="submit">
            Submit
          </button>
          <Link className={classes.cancelButton} to="/forum">
            Cancel
          </Link>
        </div>

        {!valid && <h1>Bilgileri doldur</h1>}
      </form>
    </div>
  );
}
