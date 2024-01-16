import React from "react";
import { Link } from "react-router-dom";

export default function AboutArea(props) {
  return (
    <div className="about-area py-60">
      <div className="container">
        <div className="row align-items-center">
          <div
            // : // ? "animate__animated animate__fadeInLeft"
            className={`col-lg-6 ${
              props.scrollDirection === "down" ? "wow fadeInLeft" : ""
            }`}
          >
            <div className="about-left">
              <div className="about-img">
                <img
                  src={
                    window.location.origin +
                    "/assets/img/slider/Eicher_2016.png"
                  }
                  // src="../assets/img/slider/hero-4.png"
                  alt="images"
                />
              </div>
              <div className="about-experience">
                <div className="about-experience-icon">
                  <i className="flaticon-car"></i>
                </div>
                <span>
                  30 Years Of <br />
                  Quality Service
                </span>
              </div>
            </div>
          </div>
          <div
            // ? "animate__animated animate__fadeInRight"
            className={`col-lg-6 ${
              props.scrollDirection === "down" ? "wow fadeInRight" : ""
            }`}
          >
            <div className="about-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline justify-content-start">
                  {" "}
                  <i className="flaticon-drive"></i> About Us{" "}
                </span>
                <h2 className="site-title">
                  {" "}
                  <span>Rangs Motors Limited </span>
                </h2>
              </div>
              <p className="about-text" style={{ textAlign: "justify" }}>
                At Gari Mela, we take pride in giving vehicles a second chance to hit the road with renewed vitality. As a dedicated
                entity under the trusted umbrella of Rangs Motors Limited, we
                bring a wealth of experience and a commitment to quality to the
                resale market. Our mission is to provide customers with a
                curated selection of reconditioned trucks and pickups that
                embody both reliability and sustainability while forging a
                lasting relationship with the customers. With a focus on
                quality, each vehicle undergoes a meticulous refurbishment
                process, ensuring it not only meets but exceeds industry
                standards. Our team of skilled technicians works tirelessly to
                breathe new life into every vehicle, from thorough mechanical
                inspections to aesthetic enhancements. We believe in offering
                more than just a mode of transportation; we offer a promise of
                reliability and longevity on the open road.Explore our inventory
                and experience the peace of mind that comes with choosing our
                vehicles. Thank you for considering Renewify Motors as your
                partner in driving towards a more sustainable and efficient
                future. 
              </p>
              <div className="about-list-wrapper">
                <ul className="about-list list-unstyled">
                  <li>Discover The Perfect Route to Your Dream Vehicle.</li>
                  <li>Drive Into Savings With Us.</li>
                  <li>Unlock The Road To Value And Savings.</li>
                  <li>Enhance Your Driving Experience, Not Your Budget.</li>
                </ul>
              </div>
              <Link to="about-us" className="theme-btn mt-4">
                Discover More<i className="fas fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
