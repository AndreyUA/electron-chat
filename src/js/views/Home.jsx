import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import JoinedChatsList from "../components/JoinedChatsList.jsx";
import AvailableChatsList from "../components/AvailableChatsList.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

import { fetchChats } from "../store/actions/chats";

// React component
const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel" />
        <AvailableChatsList chats={chats} />
      </div>
    </div>
  );
};

export default Home;
