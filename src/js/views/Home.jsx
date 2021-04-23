import React from "react";

// Components
import NavBar from "../components/NavBar.jsx";
import JoinedChats from "../components/JoinedChats.jsx";
import AvailableChats from "../components/AvailableChats.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

// React component
const Home = () => {
  return (
    <div className="content-wrapper">
      <NavBar />
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChats />
        </div>
        <div className="col-9 fh">
          <ViewTitle />
          <AvailableChats />
        </div>
      </div>
    </div>
  );
};

export default Home;
