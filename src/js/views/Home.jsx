import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import JoinedChatsList from "../components/JoinedChatsList.jsx";
import AvailableChatsList from "../components/AvailableChatsList.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

// Redux
import { fetchChats } from "../store/actions/chats";

// Middlewares
import Notification from "../utils/notifications";

// Components
import { withBase } from "../layouts/Base.jsx";

// React component
const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.items);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel">
          <Link className="btn btn-outline-primary" to="/chat-create">
            New
          </Link>
        </ViewTitle>
        <AvailableChatsList chats={chats} />
      </div>
    </div>
  );
};

export default withBase(Home);
