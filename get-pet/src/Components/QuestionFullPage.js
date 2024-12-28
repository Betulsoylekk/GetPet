import ForumPost from "./ForumPost";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const QuestionFullPage = () => {
  const params = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  useEffect(() => {
    fetchQuestion();
  }, []);
  async function fetchQuestion() {
    try {
      const activationURL = `http://localhost:8080/posts/${params.questionId}`;
      const res = await axios.get(activationURL);
      setCurrentPost(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  return <div>{currentPost.id}</div>;
};

export default QuestionFullPage;
