import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// Components
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

// React component
const Welcome = () => {
  const { user, isChecking } = useSelector(({ auth }) => auth);

  const [isLoginView, setIsLoginView] = useState(true);
  const isLoginHandler = () => {
    setIsLoginView(!isLoginView);
  };

  const optInText = isLoginView
    ? ["Need an account?", "Register"]
    : ["Already registered", "Login"];

  if (isChecking) {
    return <h1>LOADING...</h1>;
  }

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">
          {optInText[0]}
          <span onClick={isLoginHandler} className="btn-link ml-2">
            {optInText[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
