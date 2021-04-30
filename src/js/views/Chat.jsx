import React, { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import {
  subscribeToChat,
  subscribeToProfile,
  sendChatMessage,
  subscribeToMessages,
} from "../store/actions/chats";

// Components
import ChatUserList from "../components/ChatUsersList.jsx";
import ChatMessageslist from "../components/ChatMessageslist.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";
import { withBase } from "../layouts/Base.jsx";
import LoadingView from "../components/shared/LoadingView.jsx";
import Messenger from "../components/Messenger";

// React component
const Chat = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const peopleWatcher = useRef({});
  const activeChat = useSelector((state) => state.chats.activeChats[id]);
  const messages = useSelector((state) => state.chats.messages[id]);
  const joinedUsers = activeChat?.joinedUser;

  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id));
    },
    [id]
  );

  const subscribeToJoinedUsers = useCallback(
    (jUsers) => {
      jUsers.forEach((user) => {
        if (!peopleWatcher.current[user.uid]) {
          peopleWatcher.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatcher.current).forEach((id) =>
      peopleWatcher.current[id]()
    );
  }, [peopleWatcher.current]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    dispatch(subscribeToMessages(id));

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat..." />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUserList users={activeChat?.joinedUser} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessageslist messages={messages} />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  );
};

export default withBase(Chat, { canGoBack: true });
