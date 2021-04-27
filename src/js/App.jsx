// Progress
// 4 __dirname && 19 __filename

import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
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

// React component
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
          <Route path="/" component={Welcome} exact />
          <Route path="/home" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/chat/:id" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
};

// React component
const App = () => (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

export default App;
