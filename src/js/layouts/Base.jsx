import React from "react";

// Components
import NavBar from "../components/NavBar.jsx";

// React Component
const Base = ({ children, ...props }) => {
  return (
    <>
      <NavBar {...props} />
      {children}
    </>
  );
};

export default Base;
