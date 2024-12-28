import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Components/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./ConversationPage.module.css";

const ConversationPage = () => {
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const { senderId } = useParams(); // We get the senderId from the URL

  // Fetch conversation when the component mounts or senderId changes
  useEffect(() => {
    const getConversation = async () => {
      const res = await axios.get(
        `http://localhost:8080/messages/conversation/${authCtx.userId}/${senderId}`
      );
      setConversation(res.data);
    };

    getConversation();
  }, [authCtx.userId, senderId]);
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

  const sendMessage = async () => {
    if (newMessage !== "") {
      const messageSendRequest = {
        senderId: authCtx.userId,
        recieverId: senderId,
        message: newMessage,
      };

      await axios.post(
        "http://localhost:8080/messages/send",
        messageSendRequest
      );

      // After sending message, clear the input and refetch the conversation
      setNewMessage("");
      const res = await axios.get(
        `http://localhost:8080/messages/conversation/${authCtx.userId}/${senderId}`
      );
      setConversation(res.data);
    }
  };

  return (
    <div className={classes.container}>
      {conversation.map((message, index) => (
        <div key={index}>
          <h4 className={classes.userName}>
            From: {message.sender.userName}
            <em
              className={classes.time}
              style={{ marginLeft: "10px", color: "gray" }}
            >
              {calculateTimeAgo(message.creationTime)}
            </em>
          </h4>
          <p className={classes.text}>{message.messageText}</p>
        </div>
      ))}
      <div className={classes.sendContainer}>
        <input
          className={classes.input}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className={classes.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ConversationPage;
