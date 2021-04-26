import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// Progress
// 3 __dirname && 11 __filename

// Components
import Home from "./views/Home.jsx";
import Chat from "./views/Chat.jsx";
import Settings from "./views/Settings.jsx";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";

// Components
import NavBar from "./components/NavBar.jsx";

// React component
const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content-wrapper">
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/chat/:id" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
