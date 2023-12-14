import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLoginModal = ({previousLink}) => {
  const [show, setShow] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const notifyError = (msg) => {
    toast.warning(msg);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUserMobileChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setMobileNumber(inputValue);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await sendLoginRequest();
      if (data.status === "true") {
        notifySuccess("Login successfully.");
        localStorage.setItem("lg_us_data", JSON.stringify(data.user_data));
        setShow(false);
        setTimeout(() => {
          navigate(previousLink)
        }, 1000);
      } else if (data.status === "false") {
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
    <>
      <button type="button" class="theme-btn" onClick={handleShow}>
      <span class="far fa-user-vneck"></span>  Login First
      </button>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title >Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="login-form">
                  <form>
                    <div className="form-group">
                      <label>Mobile</label>
                      <div className="input-group mb-1">
                        <span
                          className="input-group-text bg-white"
                          id="basic-addon1"
                        >
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
                      <div className="input-group mb-1">
                        <span
                          className="input-group-text bg-white"
                          id="basic-addon2"
                        >
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
                      <Link to="/forgot-password" className="forgot-pass">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={handleLoginSubmit}
                        type="button"
                        className="theme-btn"
                      >
                        <i className="far fa-sign-in"></i> Login
                      </button>
                    </div>
                  </form>
                  {/* Register link */}
                  <div className="login-footer">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/register">Register.</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserLoginModal;
