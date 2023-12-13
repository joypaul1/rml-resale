import React from "react";
import CountArea from "../partials/CountArea";
import Teams from "../partials/Teams";
const About = () => {
  return (
    <>
      <div className="about-area py-60">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="about-left wow fadeInLeft"
                data-wow-delay=".25s"
                
              >
                <div className="about-img">
                  <img
                    src={
                      window.location.origin +
                      "/assets/img/slider/Eicher_2016.png"
                    }
                    alt=""
                  />
                </div>
                <div className="about-experience">
                  <div className="about-experience-icon">
                    <i className="flaticon-car"></i>
                  </div>
                  <b>
                    30 Years Of <br /> Quality Service
                  </b>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="about-right wow fadeInRight"
                data-wow-delay=".25s"
               
              >
                <div className="site-heading mb-3">
                  <span className="site-title-tagline justify-content-start">
                    <i className="flaticon-drive"></i> About Us
                  </span>
                  <h2 className="site-title">
                    World Largest <span>Vehicle Dealer</span> Marketplace.
                  </h2>
                </div>
                <p className="about-text text-justify">
                  At Rangs Reload, we take pride in giving vehicles a second
                  chance to hit the road with renewed vitality. As a dedicated
                  entity under the trusted umbrella of Rangs Motors Limited, we
                  bring a wealth of experience and a commitment to quality to
                  the resale market. Our mission is to provide customers with a
                  curated selection of reconditioned trucks and pickups that
                  embody both reliability and sustainability while forging a
                  lasting relationship with the customers. With a focus on
                  quality, each vehicle undergoes a meticulous refurbishment
                  process, ensuring it not only meets but exceeds industry
                  standards. Our team of skilled technicians works tirelessly to
                  breathe new life into every vehicle, from thorough mechanical
                  inspections to aesthetic enhancements. We believe in offering
                  more than just a mode of transportation; we offer a promise of
                  reliability and longevity on the open road.Explore our
                  inventory and experience the peace of mind that comes with
                  choosing our vehicles. Thank you for considering Renewify
                  Motors as your partner in driving towards a more sustainable
                  and efficient future. 
                </p>
                <div className="about-list-wrapper">
                  <ul className="about-list list-unstyled">
                    <li>Discover The Perfect Route to Your Dream Vehicle.</li>
                    <li>Drive Into Savings With Us.</li>
                    <li>Unlock The Road To Value And Savings.</li>
                    <li>Enhance Your Driving Experience, Not Your Budget.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CountArea />
      {/* <Testimonials /> */}
      <Teams />
    </>
  );
};

export default About;
