import React, { useEffect } from "react";

// Components
import JoinedChatsList from "../components/JoinedChatsList.jsx";
import AvailableChatsList from "../components/AvailableChatsList.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

// db
import { fetchChats } from "../api/chats";

// React component
const Home = () => {
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel" />
        <AvailableChatsList />
      </div>
    </div>
  );
};

export default Home;
