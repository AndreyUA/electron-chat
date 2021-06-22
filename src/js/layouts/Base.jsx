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

const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

export const withBase = (Component, config) => (props) => (
  <>
    <NavBar {...config} view={getDisplayName(Component)} />
    <Component {...props} />
  </>
);

export default Base;
