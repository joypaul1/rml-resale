import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };

  const handleUserMobileChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setMobileNumber(inputValue);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Mark the function as async
    event.preventDefault();

    try {
      const data = await sendLoginRequest();

      if (data.status === "true") {
        notifySuccess("Login successfully.");
        localStorage.setItem("lg_us_data", JSON.stringify(data.user_data));
        setTimeout(async () => {
          navigate("/");
        }, 1000);
      }if (data.status === "false") {
        notifyError(data.message);
      } 
    } catch (error) {
      notifyError("Error Login:", error);
    }
  };

  const sendLoginRequest = async () => {
    try {
      const response = await axios.get("https://api.rangsmotors.com", {
        params: {
          file_name: "user_login",
          u_num: mobileNumber,
          u_pass: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error in user login request:", error);
      throw error;
    }
  };

  return (
    <div className="login-area pt-40">
      <div className="container">
        <div className="col-md-5 mx-auto">
          <div className="login-form">
            <div className="login-header">
              <img
                src={window.location.origin + "/assets/img/logo/logo.png"}
                alt="logo"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mobile</label>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white" id="basic-addon1">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your mobile number"
                    aria-label="name"
                    value={mobileNumber}
                    onChange={handleUserMobileChange}
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <i className="fa-regular fa-eye-slash"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    aria-label="password"
                    value={password}
                    onChange={handlePasswordChange}
                    aria-describedby="basic-addon2"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <Link  to='/forgot-password' className="forgot-pass">
                  Forgot Password?
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <button type="submit" className="theme-btn">
                  <i className="far fa-sign-in"></i> Login
                </button>
              </div>
            </form>
            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/register">Register.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
