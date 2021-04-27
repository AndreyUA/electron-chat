// Progress
// 4 __dirname && 20 __filename

import React, { useEffect, Children, cloneElement } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

// Redux
import configueStore from "./store";
import { listenToAuthChanges } from "./store//actions/auth";
const store = configueStore();

// Components
import Home from "./views/Home.jsx";
import Chat from "./views/Chat.jsx";
import Settings from "./views/Settings.jsx";
import Welcome from "./views/Welcome.jsx";
import LoadingView from "./components//shared/LoadingView.jsx";

// Components
import NavBar from "./components/NavBar.jsx";

// React components

const AuthRoute = ({ children, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user);
  const onlyChild = Children.only(children);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          cloneElement(onlyChild, { ...rest, ...props })
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const ChatApp = () => {
  const dispatch = useDispatch();

  const isChecking = useSelector(({ auth }) => auth.isChecking);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, []);

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <NavBar />
      <div className="content-wrapper">
        <Switch>
          <AuthRoute path="/" exact>
            <Welcome />
          </AuthRoute>
          <AuthRoute path="/home">
            <Home />
          </AuthRoute>
          <AuthRoute path="/settings">
            <Settings />
          </AuthRoute>
          <AuthRoute path="/chat/:id">
            <Chat />
          </AuthRoute>
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
