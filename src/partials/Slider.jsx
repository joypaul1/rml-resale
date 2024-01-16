import "owl.carousel/dist/assets/owl.carousel.min.css";
import React, { useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import WOW from "wowjs";

export default function Slider(props) {
  const wow = useRef(null);
  const owl = useRef(null);

  useEffect(() => {
    wow.current = new WOW.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true
    });
    wow.current.init();

    return () => {
      if (wow.current) {
        wow.current.sync();
        wow.current = null;
      }
    };
  }, []);

  const handleSlideChange = () => {
    if (wow.current) {
      wow.current.sync();
      wow.current = null;
      wow.current = new WOW.WOW({
        mobile: false,
        live: false,
      });
      wow.current.init();
    }
  };
  const options = {
    items: 1,
    loop: true,
    nav: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    onChanged: handleSlideChange,
    onInitialized: (e) => {
      owl.current = e.target;
      if (owl.current) {
        owl.current.addEventListener("changed.owl.carousel", handleSlideChange);
      }
    },
    className: "hero-slider owl-carousel owl-theme",
  };

  return (
    <div className="hero-section">
      <OwlCarousel {...options} ref={owl}>
        {/* Slide 1 */}
        <div
          className="hero-single"
          style={{
            background:
              "url(https://www.rangsgroup.com/media/images/rangs_industries_.2e16d0ba.fill-1255x878-c0.format-webp_qusXp6k.webp)",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-6">
                <div className="hero-content">
                  <h4
                    className={`hero-title ${
                      props.scrollDirection === "down" ? "wow fadeInLeft" : ""
                    }`}
                  >
                    Discover The Perfect Route To Your <span>Dream</span>{" "}
                    Vehicle
                  </h4>
                  <p
                    className={`text-justify ${
                      props.scrollDirection === "down" ? "wow fadeInLeft" : ""
                    }`}
                    data-wow-delay=".75s"
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    Being the market leaders in brand new passenger and
                    commercial vehicles in Bangladesh with over 30 years of
                    experience in delivering world-class brands (such as Eicher
                    and Mahindra), we are now progressively moving towards
                    manufacturing as the core of our business.
                  </p>
                  <div
                    // className="hero-btn wow fadeInUp"
                    className={`hero-btn ${
                      props.scrollDirection === "down" ? "wow fadeInUp" : ""
                    }`}
                    data-wow-delay="1s"
                  >
                    <Link to={'/about-us'}  className="theme-btn">
                      About More <i className="fas fa-arrow-right-long"></i>
                    </Link>
                    {/* <Link className="theme-btn theme-btn2">
                      Learn More <i className="fas fa-arrow-right-long"></i>
                    </Link> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="hero-right">
                  <div className="hero-img ">
                    <img
                      className={`hero-btn ${
                        props.scrollDirection === "down"
                          ? "wow fadeInRight"
                          : ""
                      }`}
                      data-wow-delay="0.50s"
                      src={
                        window.location.origin + "/assets/img/slider/10.90L.png"
                      }
                      alt="sliderImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slide 2 */}
        <div
          className="hero-single"
          style={{
            background:
              "url(https://www.rangsgroup.com/media/images/2O1A9118.2e16d0ba.fill-1255x878-c0.format-webp.webp) center center/cover no-repeat",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-6">
                <div className="hero-content">
                  <h1
                    className={`hero-title ${
                      props.scrollDirection === "down" ? "wow fadeInRight" : ""
                    }`}
                    data-wow-delay=".50s"
                  >
                    Drive Into <span>Savings</span> With Us.
                  </h1>
                  <p
                    className={`text-justify ${
                      props.scrollDirection === "down" ? "wow fadeInLeft" : ""
                    }`}
                    data-wow-delay=".75s"
                  >
                    Being the market leaders in brand new passenger and
                    commercial vehicles in Bangladesh with over 30 years of
                    experience in delivering world-class brands (such as Eicher
                    and Mahindra), we are now progressively moving towards
                    manufacturing as the core of our business.
                  </p>
                  <div
                    className={`hero-btn ${
                      props.scrollDirection === "down" ? "wow fadeInLeft" : ""
                    }`}
                    data-wow-delay="1s"
                  >
                    <Link to={'/about-us'} className="theme-btn">
                      About More <i className="fas fa-arrow-right-long"></i>
                    </Link>
                    {/* <Link className="theme-btn theme-btn2"> 
                      Learn More <i className="fas fa-arrow-right-long"></i>
                    </Link>*/}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="hero-right">
                  <div className="hero-img">
                    <img
                      className={`${
                        props.scrollDirection === "down"
                          ? "wow fadeInRight"
                          : ""
                      }`}
                      data-wow-delay="0.50s"
                      src={
                        window.location.origin +
                        "/assets/img/slider/Eicher_2016.png"
                      }
                      alt="sliderImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slide 3 */}
        <div
          className="hero-single"
          style={{
            background:
              "url(https://www.rangsgroup.com/media/images/rangs_industries_.2e16d0ba.fill-1255x878-c0.format-webp_qusXp6k.webp)",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-6">
                <div className="hero-content">
                  <h1
                    className={`hero-title ${
                      props.scrollDirection === "down" ? "wow fadeInRight" : ""
                    }`}
                    data-wow-delay=".50s"
                  >
                    Unlock The Road To <span> Value </span> And{" "}
                    <span> Savings</span>.
                  </h1>
                  <p
                    className={`text-justify ${
                      props.scrollDirection === "down" ? "wow fadeInLeft" : ""
                    }`}
                    data-wow-delay=".75s"
                  >
                    Being the market leaders in brand new passenger and
                    commercial vehicles in Bangladesh with over 30 years of
                    experience in delivering world-class brands (such as Eicher
                    and Mahindra), we are now progressively moving towards
                    manufacturing as the core of our business.
                  </p>
                  <div
                    className={`hero-btn ${
                      props.scrollDirection === "down" ? "wow fadeInUp" : ""
                    }`}
                    data-wow-delay="1s"
                  >
                    <Link to={'/about-us'}  className="theme-btn">
                      About More <i className="fas fa-arrow-right-long"></i>
                    </Link>
                    {/* <Link className="theme-btn theme-btn2">
                      Learn More <i className="fas fa-arrow-right-long"></i>
                    </Link> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="hero-right">
                  <div className="hero-img">
                    <img
                      className={`${
                        props.scrollDirection === "down"
                          ? "wow fadeInRight"
                          : ""
                      }`}
                      data-wow-delay="0.50s"
                      src={
                        window.location.origin +
                        "/assets/img/slider/Dongfeng_E_94.png"
                      }
                      // src="../assets/img/slider/hero-6.png"
                      alt="sliderImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hero-single"
          style={{
            background:
              "url(https://www.rangsgroup.com/media/images/rangs_industries_.2e16d0ba.fill-1255x878-c0.format-webp_qusXp6k.webp)",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-6">
                <div className="hero-content">
                  <h1
                    className={`hero-title ${
                      props.scrollDirection === "down" ? "wow fadeInRight" : ""
                    }`}
                    data-wow-delay=".50s"
                  >
                    Enhance Your Driving <span> Experience</span>, Not Your{" "}
                    <span> Budget</span>.
                  </h1>
                  <p
                    className={`text-justify ${
                      props.scrollDirection === "down" ? "wow fadeInLeft" : ""
                    }`}
                    data-wow-delay=".75s"
                  >
                    Being the market leaders in brand new passenger and
                    commercial vehicles in Bangladesh with over 30 years of
                    experience in delivering world-class brands (such as Eicher
                    and Mahindra), we are now progressively moving towards
                    manufacturing as the core of our business.
                  </p>
                  <div className="hero-btn wow fadeInUp" data-wow-delay="1s">
                    <Link  to={'/about-us'}  className="theme-btn">
                      About More <i className="fas fa-arrow-right-long"></i>
                    </Link>
                    {/* <Link className="theme-btn theme-btn2">
                      Learn More <i className="fas fa-arrow-right-long"></i>
                    </Link> */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="hero-right">
                  <div className="hero-img">
                    <img
                      className="wow fadeInRight"
                      data-wow-delay="0.50s"
                      style={{
                        visibility: "visible",
                        animationDelay: "0.50s",
                        animationName: "fadeInRight",
                      }}
                      src={
                        window.location.origin +
                        "/assets/img/slider/Dongfeng_E_94.png"
                      }
                      // src="../assets/img/slider/hero-6.png"
                      alt="sliderImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
}
