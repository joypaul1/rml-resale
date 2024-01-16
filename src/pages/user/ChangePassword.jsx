import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword(props) {
  const [userPassword, setuserPassword] = useState("");
  const [userRePassword, setuserRePassword] = useState("");
  const navigate = useNavigate();
  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };
  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));
  const handleLogout = () => {
    notifySuccess("Logout successfully.");
    setTimeout(async () => {
      navigate("/");
      localStorage.removeItem("lg_us_data");
    }, 1000);
  };
  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 15) {
      setuserPassword(inputValue);
    } else {
      notifyError("Passwod Lenght Maximum 15.");
    }
  };
  const handleRePasswordChange = (event) => {
    setuserRePassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if passwords match
    if (userPassword !== userRePassword) {
      notifyError("Passwords do not match.");
      return; // Do not proceed further if passwords don't match
    }
    try {
      const data = await sendPassRequest();
      if (data.status === "true") {
        notifySuccess("Password Changed Successfully.");
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      notifyError("Error :", error);
    }
  };
  const sendPassRequest = async () => {
    const response = await axios.get(
      `https://api.garimela.com/?file_name=pass_change&u_id=${userlogData.ID}&u_pass=${userPassword}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };
  return (
    <div className="user-profile py-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="user-profile-sidebar">
              <div className="user-profile-sidebar-top">
                <div className="user-profile-img">
                  <img
                    src={
                      userlogData.PICTURE_LINK ||
                      "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                    }
                    alt=""
                  />
                  <button type="button" className="profile-img-btn">
                    <i className="far fa-camera"></i>
                  </button>
                  <input type="file" className="profile-img-file" />
                </div>
                <h5> {userlogData.USER_NAME} </h5>
                <p>
                  <i
                    className="far solid fa-phone"
                    style={{ color: "#EF1D26" }}
                  ></i>{" "}
                  <span>{userlogData.USER_MOBILE} </span>
                </p>
              </div>
              <ul className="user-profile-sidebar-list">
                <ul className="user-profile-sidebar-list">
                  <li>
                    <Link to="/dashboard">
                      <i className="far fa-layer-group"></i> Bidding Listing
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <i className="far fa-user"></i> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/change-password" className="active">
                      <i className="far fa-gear"></i> Change Password
                    </Link>
                  </li>

                  <li>
                    <Link onClick={handleLogout}>
                      <i className="far fa-sign-out"></i> Logout
                    </Link>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="user-profile-wrapper">
              <div className="row">
                <div className="col-lg-12">
                  <div className="user-profile-card">
                    <h4 className="user-profile-card-title">Change Password</h4>
                    <div className="col-lg-12">
                      <div className="user-profile-form">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="text"
                              value={userPassword || ''}
                              className="form-control"
                              placeholder="Your Password"
                              onChange={handlePasswordChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Re-Type Password</label>
                            <input
                              type="text"
                              value={userRePassword || ''}
                              className="form-control"
                              placeholder="Re-Type Password"
                              onChange={handleRePasswordChange}
                            />
                          </div>

                          <button type="submit" className="theme-btn my-3">
                            <span className="far fa-file"></span> Update
                            Password
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
