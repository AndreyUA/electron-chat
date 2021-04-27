import React from "react";

// Components
import Loader from "./Loader.jsx";

// React component
const LoadingView = ({ message = "Just one moment please..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-view">
        <div className="loading-view-container">
          <div className="mb-3">{message}</div>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default LoadingView;
