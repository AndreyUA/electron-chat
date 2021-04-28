// Progress
// 5 __dirname && 4 __filename

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
const store = configueStore();

// Components
import Home from "./views/Home.jsx";
import Chat from "./views/Chat.jsx";
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

  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);

  useEffect(() => {
    const unsubFromAuth = dispatch(listenToAuthChanges());
    const unsubFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubFromAuth();
      unsubFromConnection();
    };
  }, [dispatch]);

  if (!isOnline) {
    return (
      <LoadingView message="Application has been disconnected from the internet. Please, reconnect!" />
    );
  }

  if (isChecking) {
    return <LoadingView />;
  }

  console.log(isOnline);

  return (
    <Router>
      <div className="content-wrapper">
        <Switch>
          <Route path="/" exact component={Welcome} />
          <AuthRoute path="/home" component={Home} />
          <AuthRoute path="/settings" component={Settings} />
          <AuthRoute path="/chat/:id" component={Chat} />
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
