import React, { useState } from "react";

// Utils
import { createTimestamp } from "../utils/time";

// React component
const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      setValue("");
    }
  };

  const sendMessage = () => {
    if (value.trim() === "") return;

    const message = {
      content: value.trim(),
      timestamp: createTimestamp(),
    };

    onSubmit(message);
  };

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={onKeyPress}
        value={value}
        className="form-control"
        rows="3"
        placeholder="Type your message here..."
      ></textarea>
    </div>
  );
};

export default Messenger;
