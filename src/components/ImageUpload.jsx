import React, { useState } from "react";

function ImageUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("http://localhost:8000/imgUpload", {
          method: "POST",
          body: formData, // Pass formData directly as the body
        });

        const data = await response.json();
        console.log(data); // Handle success or error messages from the server
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
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
                <label>Mobile</label>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-white" id="basic-addon1">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Your profile Image"
                    aria-label="image"
                    aria-describedby="basic-addon1"
                    onChange={handleFileChange}
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
