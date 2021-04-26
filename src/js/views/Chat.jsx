import React from "react";

// Components
import ChatUserList from "../components/ChatUsersList.jsx";
import ChatMessageslist from "../components/ChatMessageslist.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

// React component
const Chat = () => {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <ChatMessageslist />
      </div>
    </div>
  );
};

export default Chat;
