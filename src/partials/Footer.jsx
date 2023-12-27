import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer-widget">
        <div className="container">
          <div className="row footer-widget-wrapper pt-100 pb-70">
            <div className="col-md-6 col-lg-5">
              <div className="footer-widget-box about-us">
                <Link to="/" className="footer-logo">
                  <img  src={window.location.origin+ "/assets/img/logo/logo.png"} alt="Company Logo" />
                </Link>
                {/* Rest of the about us content */}
                <p className="mb-3">
                  We are many variations of passages available but the majority
                  have suffered alteration in some form by injected humour words
                  believable.
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
                    <span className="__cf_email__">info@rangsgroup.com</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-md-6 col-lg-2">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Quick Links</h4>
                <ul className="footer-list">
                  <li>
                    <Link to="/about-us">
                      <i className="fas fa-caret-right"></i> About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/service">
                      <i className="fas fa-caret-right"></i> Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <i className="fas fa-caret-right"></i> Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
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
                  {/* <li>
                    <Link to="/service">
                      <i className="fas fa-caret-right"></i> Service
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/contact">
                      <i className="fas fa-caret-right"></i> Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="footer-widget-box list">
                <h4 className="footer-widget-title">Newsletter</h4>
                {/* Newsletter content */}
                <div className="footer-newsletter">
                  <p>Subscribe Our Newsletter To Get Latest Update And News</p>
                  <div className="subscribe-form">
                    <form  method="post">
                      {/* Add a "name" attribute to the input for better form handling */}
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
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
                <Link > RML </Link> All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 align-self-center">
              <ul className="footer-social">
                <li>
                  <a
                    href="https://www.facebook.com/rangsmotorsbd"
                    target="_blank" 
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/rangsmotorslimited"
                    target="_blank" rel="noreferrer"
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
