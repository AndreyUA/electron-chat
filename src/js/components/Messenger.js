import React, { useState } from "react";

// React component
const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(value);
      setValue("");
    }
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
