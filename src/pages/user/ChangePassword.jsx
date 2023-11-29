import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword(props) {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };
  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const handleSubmit = async (event) => {
    // Mark the function as async
    event.preventDefault();

    try {
      const data = await sendLoginRequest();
      console.log(data);
      if (data.status === "true") {
        notifySuccess("Login successfully.");

        localStorage.setItem("lg_us_data", JSON.stringify(data.user_data));
        // const userData = JSON.parse(localStorage.getItem('lg_us_data'));
        // console.log(userData, 'userData');
        setTimeout(async () => {
          navigate("/");
        }, 1000);
      } else {
        notifyError("User Not Found!");
      }
    } catch (error) {
      notifyError("Error Login:", error);
    }
  };
  const sendLoginRequest = async () => {
    const response = await fetch(
      "https://api.rangsmotors.com?file_name=user_login&u_num=" + mobileNumber,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
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
                <div className="input-group mt-3">
                  <span className="input-group-text bg-white" id="basic-addon2">
                    <i className="fa-regular fa-phone"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Registered Phone Number"
                    aria-label="password"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    aria-describedby="basic-addon2"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mb-4">
                <a href="forgot-password" className="forgot-pass">
                  Forgot Password?
                </a>
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
}

export default ChangePassword;