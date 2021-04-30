import React from "react";

// React component
const ChatMessageslist = ({ messages = [] }) => {
  console.log(messages);

  return (
    <div className="chat-container">
      <ul className="chat-box chatContainerScroll">
        {messages.map((message) => (
          <li key={message.id} className="chat-right">
            <div className="chat-avatar">
              <img
                src="https://i.dlpng.com/static/png/7105396_preview.png"
                alt="Retail Admin"
              />
              <div className="chat-name">Test User 4</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{message.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">{message.timestamp}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessageslist;
