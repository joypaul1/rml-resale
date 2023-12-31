import React, { useState } from "react";

export const RegistrationForm = ({
  userName,
  mobileNumber,
  handleUserNameChange,
  handlePassword,
  handleRegSubmit,
  isPasswordValid,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form
      method="post"
      onSubmit={handleRegSubmit}
      autoComplete="off"
      className="mt-2"
    >
      <div className="form-group">
        <div className="input-group mb-3">
          <span className="input-group-text bg-white" id="basic-addon1">
            <i className="fa-regular fa-circle-user"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Your Full Name"
            aria-label="name"
            aria-describedby="basic-addon1"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <div className="input-group mb-3">
          <span  onClick={togglePasswordVisibility} className="input-group-text bg-white" id="basic-addon1">
            <i
              className={`fa-regular ${
                isPasswordVisible ? " fa-eye" : " fa-eye-slash"
              }`}
              
            ></i>
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className={`form-control ${isPasswordValid ? "" : "border-red"}`}
            placeholder="Your Password"
            aria-label="password"
            aria-describedby="basic-addon1"
            onChange={handlePassword}
            required

          />
        </div>
        <small className="d-block text-right text-danger">
          [Minmum 4 digit Password.]
        </small>
      </div>
      <div className="d-flex align-items-center">
        <button type="submit" disabled={!isPasswordValid} className="theme-btn">
          Register <i className="fa-solid fa-comment-sms fa-beat"></i>
        </button>
      </div>
    </form>
  );
};
