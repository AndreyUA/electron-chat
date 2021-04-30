// Progress
// 7 __dirname && 6 __filename

// TODO: api - connection

import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

// Redux
import configueStore from "./store";
import { listenToAuthChanges } from "./store/actions/auth";
import { listenToConnectionChanges } from "./store/actions/app";
import { checkUserConnection } from "./store/actions/connection";
const store = configueStore();

// Components
import Home from "./views/Home.jsx";
import Chat from "./views/Chat.jsx";
import ChatCreate from "./views/ChatCreate.jsx";
import Settings from "./views/Settings.jsx";
import Welcome from "./views/Welcome.jsx";
import LoadingView from "./components//shared/LoadingView.jsx";

// React components
const AuthRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const ChatApp = () => {
  const dispatch = useDispatch();

  const { user, isChecking } = useSelector((state) => state.auth);
  const isOnline = useSelector(({ app }) => app.isOnline);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnetcion;
    if (user?.uid) {
      unsubFromUserConnetcion = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnetcion && unsubFromUserConnetcion();
    };
  }, [dispatch, user]);

  if (!isOnline) {
    return (
      <LoadingView message="Application has been disconnected from the internet. Please, reconnect!" />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <div className="content-wrapper">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <AuthRoute path="/home" component={Home} />
          <AuthRoute path="/settings" component={Settings} />
          <AuthRoute path="/chat/:id" component={Chat} />
          <AuthRoute path="/chat-create" component={ChatCreate} />
        </Switch>
      </div>
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

export default App;
