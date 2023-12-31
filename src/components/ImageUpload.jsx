import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function ImageUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  let userlogData = JSON.parse(localStorage.getItem("lg_us_data"));

  const navigate = useNavigate();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const res = await axios.post(
          "https://api.rangsmotors.com/upload.php",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            params: { user_id: userlogData.ID }, // Passing user_id as a parameter
          }
        );
        userlogData.PICTURE_LINK = res.data.imageURL;
        localStorage.setItem("lg_us_data", JSON.stringify(userlogData));

        if (res.data.status) {
          notifySuccess("Image Updated Successfully.");
          setTimeout(async () => {
            navigate("/dashboard");
          }, 1000);
        } else {
          notifyError(res.data.message);
        }
        // Handle success or error messages from the server
      } catch (error) {
        notifyError("Error :", error);
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("no file uploaded");
      // Handle case when no file is selected
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
                <label>User Profile Image :</label>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white" id="basic-addon1">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    placeholder="Your profile Image"
                    aria-label="image"
                    aria-describedby="basic-addon1"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <button type="submit" className="theme-btn">
                  <i className="far fa-sign-in"></i> Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
