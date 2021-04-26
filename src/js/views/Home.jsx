import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Components
import JoinedChatsList from "../components/JoinedChatsList.jsx";
import AvailableChatsList from "../components/AvailableChatsList.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

import { fetchChats } from "../store//actions/chats";

// React component
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

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
