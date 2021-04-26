import React, { useState } from "react";

// Components
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

// React component
const Welcome = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const isLoginHandler = () => {
    setIsLoginView(!isLoginView);
  };

  const optInText = isLoginView
    ? ["Need an account?", "Register"]
    : ["Already registered", "Login"];

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
