// Progress
// 4 __dirname && 2 __filename

import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

// Redux
import configueStore from "./store";
const store = configueStore();

// Components
import Home from "./views/Home.jsx";
import Chat from "./views/Chat.jsx";
import Settings from "./views/Settings.jsx";
import Welcome from "./views/Welcome.jsx";

// Components
import NavBar from "./components/NavBar.jsx";

// React component
const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
