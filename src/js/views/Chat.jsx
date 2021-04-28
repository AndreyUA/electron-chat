import React from "react";
import { useParams } from "react-router-dom";

// Components
import ChatUserList from "../components/ChatUsersList.jsx";
import ChatMessageslist from "../components/ChatMessageslist.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";
import { withBase } from "../layouts/Base.jsx";

// React component
const Chat = () => {
  const { id } = useParams();

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${id}`} />
        <ChatMessageslist />
      </div>
    </div>
  );
};

export default withBase(Chat, { canGoBack: true });
