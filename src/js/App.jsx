import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// Progress
// 3 __dirname && 5 __filename

// Components
import Home from "./views/Home.jsx";

// Components
import NavBar from "./components/NavBar.jsx";

// React component
const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="content-wrapper">
        <Switch>
          <Route path="/settings" />
          <Route path="/login" />
          <Route path="/register" />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
