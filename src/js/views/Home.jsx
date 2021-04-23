import React from "react";

// Components
import JoinedChats from "../components/JoinedChats.jsx";
import AvailableChats from "../components/AvailableChats.jsx";
import ViewTitle from "../components/shared/ViewTitle.jsx";

// React component
const Home = () => {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChats />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <AvailableChats />
      </div>
    </div>
  );
};

export default Home;
