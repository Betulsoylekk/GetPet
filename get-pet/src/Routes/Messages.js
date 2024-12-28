import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../Components/AuthContext";
import { Link } from "react-router-dom";
import axios from 'axios';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getMessagesForUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/messages/${authCtx.userId}`);
        const allMessages = res.data;
        const latestMessages = {};
  
        allMessages.forEach(message => {
          let otherUserId;
          if (message.sender.id == authCtx.userId) {
            otherUserId = message.receiver.id;
          } else {
            otherUserId = message.sender.id;
          }
          if (!latestMessages[otherUserId]) {
            latestMessages[otherUserId] = {...message, otherUserId};
          } else {
            if (new Date(message.creationTime) > new Date(latestMessages[otherUserId].creationTime)) {
              latestMessages[otherUserId] = {...message, otherUserId};

            }
          }
        });
                
        const filteredMessages = Object.values(latestMessages).filter(
          message => !(message.sender.id === authCtx.userId && message.receiver.id === authCtx.userId)
        );
        
        setMessages(filteredMessages);
      } catch (e) {
        console.error(e);
      }
    };
  
    getMessagesForUser();
  }, [authCtx.userId]);
  
  return (
    <div>
      <h1>Messages</h1>  
      {messages.map((message, index) => {
        const otherUser = message.sender.id == authCtx.userId ? message.receiver : message.sender;
        return (
          <div key={index}>
            <h4>Chat with: {otherUser.userName}</h4>
            <p>Last message: {message.messageText}</p>
            <Link to={`/messages/${otherUser.id}`}><button>Open the Chat</button></Link>
          </div>
        );
      })}
    </div>
  );

};

export default MessagesPage;
