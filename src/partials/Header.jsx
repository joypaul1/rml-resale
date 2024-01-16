import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HeaderManuList from "../components/CategortyList";
import ImgSrc from "../components/ImgSrc";
import Sidebar from "./Sidebar";
import UserLoginModal from "./UserLoginModal";
export default function Header() {
  const navigate = useNavigate();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));
  const handleLogout = () => {
    // Clear user session data upon logout
    localStorage.removeItem("lg_us_data");
    notifySuccess("Logout successfully.");
    setTimeout(async () => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-top-wrapper">
              <div className="header-top-left">
                <div className="header-top-contact">
                  <ul>
                    <li>
                      <Link>
                        <i className="far fa-envelopes"></i>{" "}
                        <span className="__cf_email__">
                          info@rangsgroup.com
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="far fa-fax"></i> +88 02 9130895{" "}
                      </Link>
                    </li>
                    <li>
                      <Link>
                        <i className="far fa-alarm-clock"></i> Sun - Thu (09AM -
                        06PM)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-top-right">
                {userlogData && (
                  <div className="header-top-link">
                    <Link to="/dashboard">
                      {userlogData.PICTURE_LINK ? (
                        <ImgSrc src={userlogData.PICTURE_LINK} width='20px' styleCsc={{ borderRadius:'50%' }} />
                      ) : (
                        <i className="fa-solid fa-circle-user"></i>
                      )}

                      <span style={{ color: "#EF1D26" }}>
                        {" "}
                        {userlogData.USER_NAME}{" "}
                      </span>
                    </Link>
                  </div>
                )}
                <div className="buttons">
                  <button className="activelang">EN</button>
                  <button>BN</button>
                </div>
                <div className="header-top-social">
                  <span>Follow Us: </span>
                  <a
                    rel="noreferrer"
                    href="https://www.facebook.com/rangsmotorsbd"
                    target="_blank"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/rangsmotorslimited "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-navigation">
          <nav className="navbar navbar-expand-lg">
            <div className="container position-relative">
              <Link to="/" className="navbar-brand">
                <img
                  src={window.location.origin + "/assets/img/logo/eng_logo.png"}
                  alt="logo"
                />
              </Link>
              <div className="mobile-menu-right">
                {!userlogData && (
                  <UserLoginModal previousLink={window.location.pathname} />
                )}
                {userlogData && (
                  <div className="nav-right-account">
                    <div className="dropdown">
                      <div data-bs-toggle="dropdown" aria-expanded="false">
                        {userlogData.PICTURE_LINK ? (
                          <ImgSrc src={userlogData.PICTURE_LINK} />
                        ) : (
                          <img
                            src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                            alt="user"
                          />
                        )}
                      </div>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link className="dropdown-item" to="/dashboard">
                            <i className="far fa-gauge-high"></i> Dashboard
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item"
                          >
                            <i className="far fa-sign-out"></i> Log Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main_nav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-mobile-icon">
                    <i className="far fa-bars"></i>
                  </span>
                </button>
              </div>
              <div className="collapse navbar-collapse" id="main_nav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home{" "}
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Eicher
                    </Link>
                    <ul className="dropdown-menu fade-down">
                      <HeaderManuList brand_id={1} />
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Mahindra
                    </Link>
                    <ul className="dropdown-menu fade-down">
                      <HeaderManuList brand_id={2} />
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Dongfeng
                    </Link>
                    <ul className="dropdown-menu fade-down">
                      <HeaderManuList brand_id={3} />
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/about-us" className="nav-link">
                      {" "}
                      About Us{" "}
                    </Link>
                  </li>

                  {/* <li className="nav-item">
                    <Link to="/service" className="nav-link">
                      {" "}
                      Service{" "}
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/contact" className="nav-link">
                      {" "}
                      Contact{" "}
                    </Link>
                  </li>
                </ul>
                <div className="nav-right">
                  {!userlogData && (
                    <div className="nav-right-btn mt-2">
                      <UserLoginModal previousLink={window.location.pathname} />
                      {/* <Link to="/login" className="theme-btn">
                        <span className="far fa-user-vneck"></span> Loginaa
                      </Link> */}
                    </div>
                  )}
                  {userlogData && (
                    <div className="nav-right-account">
                      <div className="dropdown">
                        <div data-bs-toggle="dropdown" aria-expanded="false">
                          {userlogData.PICTURE_LINK ? (
                            <ImgSrc src={userlogData.PICTURE_LINK} />
                          ) : (
                            <img
                              src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                              alt="user"
                            />
                          )}
                        </div>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link to="/dashboard" className="dropdown-item">
                              <i className="far fa-gauge-high"></i> Dashboard
                            </Link>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i className="far fa-sign-out"></i> Log Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="sidebar-btn" onClick={handleSidebarToggle}>
                    <button type="button" className="nav-right-link">
                      <i className="far fa-bars-sort"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarClose={handleSidebarClose}
      />
    </>
  );
}
