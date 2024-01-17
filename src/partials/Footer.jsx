import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Footer() {
  const [mobileNumber, setMobileNumber] = useState("");
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

  const subcribeSubmit = async (e) => {
    e.preventDefault();
    if (mobileNumber !== 11) {
      notifyError("Mobile number is not valid.");
      return false;
    }
    try {
      const response = await axios.get(
        "https://api.garimela.com/?file_name=client_subscribe" +
          `&mobile=${mobileNumber}&sis_id=1`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (data.status === "true") {
        setMobileNumber(" ");
        notifySuccess("Subscribed Successfully.");
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      console.error("Error subscribe:", error);
    }
  };
  return (
    <footer className="footer-area">
      <div className="footer-widget">
        <div className="container">
          <div className="row footer-widget-wrapper pt-100 pb-70">
            <div className="col-md-6 col-lg-5">
              <div className="footer-widget-box about-us">
                <Link to="/" className="footer-logo">
                  <img
                    src={
                      window.location.origin + "/assets/img/logo/eng_logo.png"
                    }
                    alt="Company Logo"
                  />
                </Link>
                {/* Rest of the about us content */}
                <p className="mb-3">
                  Welcome to GariMela – your top spot for reconditioned
                  commercial vehicles. As the latest platform dedicated to
                  bidding on high-quality trucks, buses, and pickups, we blend
                  innovation with automotive expertise for a seamless buying
                  experience. Welcome to the future of online vehicle bidding!
                </p>
                <ul className="footer-contact">
                  <li>
                    <a href="tel:+16758">
                      <i className="far fa-phone"></i> 16758
                    </a>
                  </li>
                  <li>
                    <i className="far fa-map-marker-alt"></i> 117/A, Level-04,
                    Old Air Port Road Bijoy Sarani, Tejgaon, Dhaka-1212.
                  </li>
                  <li>
                    <i className="far fa-paper-plane"></i>
                    <span className="__cf_email__">info@garimela.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Support Center</h4>
                <ul className="footer-list">
                  {/* List items for support center */}
                  <li>
                    <Link to="/about-us">
                      <i className="fas fa-caret-right"></i> About Us
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact">
                      <i className="fas fa-caret-right"></i> Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-widget-box list ">
                <h4 className="footer-widget-title">Mobile Notification</h4>
                {/* Newsletter content */}
                <div className="footer-newsletter ">
                  <p>Get Our Latest Offer & News.</p>
                  <div className="subscribe-form">
                    <form
                      onSubmit={subcribeSubmit}
                      autoComplete="off"
                      className="row justify-content-center"
                    >
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Your Valid Mobile Number"
                        required
                        value={mobileNumber || ""}
                        onChange={handleUserMobileChange}
                      />
                      <button className="theme-btn" type="submit">
                        Subscribe Now <i className="far fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <p className="copyright-text">
                &copy; Copyright <span id="date"></span>{" "}
                <Link> Gari Mela </Link> All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 align-self-center">
              <ul className="footer-social">
                <li>
                  <a
                    href="https://www.facebook.com/garimela.bd"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/rangsmotorslimited"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                {/* Other social media links */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
