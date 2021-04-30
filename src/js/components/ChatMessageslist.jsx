import React, { useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

// Utils
import { formatTimeAgo } from "../utils/time";

// React component
const ChatMessageslist = ({ messages = [] }) => {
  const ulRef = useRef(null);
  const { uid } = useSelector((state) => state.auth.user);

  const isAuthorIf = useCallback((message) =>
    message?.author.uid === uid ? "chat-right" : "chat-left"
  );

  useEffect(() => {
    ulRef.current.scrollIntoView(false);
  });

  return (
    <div className="chat-container">
      <ul ref={ulRef} className="chat-box chatContainerScroll">
        {messages.map((message) => (
          <li key={message.id} className={isAuthorIf(message)}>
            <div className="chat-avatar">
              <img src={message?.author.avatar} alt="Retail Admin" />
              <div className="chat-name">{message?.author.username}</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{message.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">
                {formatTimeAgo(message.timestamp)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessageslist;
