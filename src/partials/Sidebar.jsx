import { Link } from "react-router-dom";

export default function Sidebar({ isSidebarOpen, handleSidebarClose }) {
  return (
    <div className={`sidebar-popup ${isSidebarOpen ? "open" : ""}`}>
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <button
            type="button"
            className="close-sidebar-popup"
            onClick={handleSidebarClose}
          >
            <i className="far fa-xmark"></i>
          </button>
          <div className="sidebar-logo">
            <img
              src={window.location.origin + "/assets/img/logo/logo.png"}
              alt="logo"
            />
          </div>
          <div className="sidebar-about">
            <h4>About Us</h4>
            <p>
              At Rangs Resale, we take pride in giving vehicles a second chance
              to hit the road with renewed vitality. As a dedicated entity under
              the trusted umbrella of Rangs Motors Limited, we bring a wealth of
              experience and a commitment to quality to the resale market. Our
              mission is to provide customers with a curated selection of
              reconditioned trucks and pickups that embody both reliability and
              sustainability while forging a lasting relationship with the
              customers. With a focus on quality, each vehicle undergoes a
              meticulous refurbishment process, ensuring it not only meets but
              exceeds industry standards. Our team of skilled technicians works
              tirelessly to breathe new life into every vehicle, from thorough
              mechanical inspections to aesthetic enhancements. We believe in
              offering more than just a mode of transportation; we offer a
              promise of reliability and longevity on the open road.Explore our
              inventory and experience the peace of mind that comes with
              choosing our vehicles. Thank you for considering Renewify Motors
              as your partner in driving towards a more sustainable and
              efficient future.
            </p>
          </div>
          <div className="sidebar-contact">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <h6>Email</h6>
                <Link>
                  <i className="far fa-envelope"></i>
                  <span className="__cf_email__">info@rangsgroup.com</span>
                </Link>
              </li>
              <li>
                <h6>Phone</h6>
                <a href="tel:+16758">
                  <i className="far fa-phone"></i>16758
                </a>
              </li>
              <li>
                <h6>Address</h6>
                <Link rel="noopener">
                  <i className="far fa-location-dot"></i> 117/A, Level-04, Old
                  Air Port Road Bijoy Sarani, Tejgaon, Dhaka-1212.
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-social">
            <h4>Follow Us</h4>
            <a
              href="https://www.facebook.com/rangsmotorsbd"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a  href="https://www.linkedin.com/company/rangsmotorslimited "
              target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
