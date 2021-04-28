import React from "react";

// Components
import { withBase } from "../layouts/Base.jsx";

const ChatCreate = () => {
  return (
    <div>
      <h1>create chat</h1>
    </div>
  );
};

export default withBase(ChatCreate, { canGoBack: true });
