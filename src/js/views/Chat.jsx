import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { subscribeToChat, subscribeToProfile } from "../store/actions/chats";

// Components
import ChatUserList from "../components/ChatUsersList.jsx";
import ChatMessageslist from "../components/ChatMessageslist.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";
import { withBase } from "../layouts/Base.jsx";

// React component
const Chat = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const peopleWatcher = useRef({});
  const activeChat = useSelector((state) => state.chats.activeChats[id]);
  const joinedUsers = activeChat?.joinedUser;

  const subscribeToJoinedUsers = (jUsers) => {
    jUsers.forEach((user) => {
      if (!peopleWatcher.current[user.uid]) {
        peopleWatcher.current[user.uid] = dispatch(
          subscribeToProfile(user.uid)
        );
      }
    });
  };

  const unsubFromJoinedUsers = () => {
    Object.keys(peopleWatcher.current).forEach((id) =>
      peopleWatcher.current[id]()
    );
  };

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUser} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessageslist />
      </div>
    </div>
  );
};

export default withBase(Chat, { canGoBack: true });
