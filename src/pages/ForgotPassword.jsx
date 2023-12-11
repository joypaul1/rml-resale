import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword(props) {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const notifyError = (msg) => {
    toast.warning(msg);
  };

  const handleMobileNumberChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setMobileNumber(inputValue);
    }
  };

  const isMobileNumberValid = () => {
    const bdMobileNumberRegex = /^01\d{9}$/;
    return bdMobileNumberRegex.test(mobileNumber);
  };

  const getBorderColor = () => {
    return mobileNumber.length === 0
      ? ""
      : isMobileNumberValid()
        ? "green"
        : "red";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await sendLoginRequest();
      // console.log(data);
      if (data.status === "true") {
        notifySuccess(data.message);
        setTimeout(async () => {
          navigate("/login");
        }, 1000);
      } else {
        notifyError(data.message);

      }
    } catch (error) {
      notifyError("Error Login:", error);
    }
  };

  const sendLoginRequest = async () => {
    const response = await axios.get(
      `https://api.rangsmotors.com?file_name=forgot_password&u_num=${mobileNumber}`,
      {
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
            <form
              method="post"
              onSubmit={handleSubmit}
              autoComplete="off"
              className="mt-2"
            >
              <div className="form-group">
                <label>
                  Enter Your Registed Mobile Number :{" "}
                  <i className="fa-regular fa-mobile-alt"></i>{" "}
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white" id="basic-addon1">
                    +88
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 01XXXXXXXXX"
                    aria-label="mobile"
                    aria-describedby="basic-addon1"
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    style={{ borderColor: getBorderColor() }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button
                  type="submit"
                  disabled={!isMobileNumberValid()}
                  className="theme-btn"
                  style={{
                    backgroundColor: !isMobileNumberValid()
                      ? "darkslategrey"
                      : "#EF1D26",
                  }}
                >
                  Send OTP <i className="fa-solid fa-comment-sms fa-beat"></i>
                </button>
              </div>
            </form>
            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/register">Registration.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
