import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    mobile: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    message: false,
    mobile: false,
  });

  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  const notifyError = (msg) => {
    toast.warning(msg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // get the  input value & name
    let isSubmitDisabled = false;
    let isFieldInvalid = false;

    if (name === "mobile") {
      if (value.length !== 11 || !value.startsWith("01")) {
        isSubmitDisabled = true;
        isFieldInvalid = true;
      } else {
        isFieldInvalid = false;
      }
    } else if (value.trim() === "") {
      isSubmitDisabled = true;
      isFieldInvalid = true;
    } else {
      isFieldInvalid = false;
    }

    setFormErrors({ ...formErrors, [name]: isFieldInvalid }); // set errors for all fields
    setFormData({ ...formData, [name]: value }); // set data for all fields
    setSubmitDisabled(isSubmitDisabled); // set submit disabled
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      setLoading(true);
      const response = await axios.post(
        "https://api.garimela.com/?file_name=client_contact",
        JSON.stringify(formData), // Data should be directly passed as the second argument
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      const data = response.data;
      if (data.status === "true") {
        notifySuccess("Submitted successfully");
      } else {
        notifyError("Error: " + response.message);
        console.error("Error sending data", response);
      }
    } catch (error) {
      notifyError("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="contact-area py-120">
      <div className="container">
        <div className="contact-content">
          <div className="row">
            <div className="col-md-3">
              <div className="contact-info">
                <div className="contact-info-icon">
                  <i className="fal fa-map-location-dot"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Office Address</h5>
                  <p>
                    117/A, Level-04, Old Air Port Road Bijoy Sarani, Tejgaon,
                    Dhaka-1212.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="contact-info">
                <div className="contact-info-icon">
                  <i className="fal fa-phone-volume"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Call Us</h5>
                  <p>16758</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="contact-info">
                <div className="contact-info-icon">
                  <i className="fal fa-envelopes"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Email Us</h5>
                  <p>
                    <a
                      href="/cdn-cgi/l/email-protection"
                      className="__cf_email__"
                      data-cfemail="aac3c4ccc5eacfd2cbc7dac6cf84c9c5c7"
                    >
                      info@rangsgroup.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="contact-info">
                <div className="contact-info-icon">
                  <i className="fal fa-alarm-clock"></i>
                </div>
                <div className="contact-info-content">
                  <h5>Open Time</h5>
                  <p>Sun - Thu (09AM - 06PM)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-wrapper">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="contact-img">
                <img
                  src="https://www.rangsgroup.com/media/images/2O1A9118.2e16d0ba.fill-1255x878-c0.format-webp.webp"
                  alt="thumb"
                />
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="contact-form">
                <div className="contact-form-header">
                  <h2 className="text-center">Get In Touch with us</h2>
                
                </div>
                <form
                  method="post"
                  id="contact-form"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors.name ? "border-red" : ""
                          }`}
                          name="name"
                          placeholder="Your Name"
                          required=""
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          className={`form-control ${
                            formErrors.mobile ? "border-red" : ""
                          }`}
                          name="mobile"
                          placeholder="Your valid mobile number"
                          required=""
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      cols="30"
                      rows="5"
                      className={`form-control ${
                        formErrors.message ? "border-red" : ""
                      }`}
                      placeholder="Write Your Message"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-right">
                    <button
                      type="submit"
                      className="theme-btn"
                      disabled={loading || submitDisabled} // Add the condition to disable based on validation
                    >
                      {loading ? "Sending..." : "Send Message"}{" "}
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
