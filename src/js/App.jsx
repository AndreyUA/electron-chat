// Progress
// 4 __dirname && 21 __filename

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
import { listenToAuthChanges } from "./store//actions/auth";
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

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, []);

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
