import React from "react";

function ChooseUs(props) {
  return (
    <div className="choose-area py-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className={`choose-content-wrapper`}>
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="choose-item">
                    <span className="choose-count">01</span>
                    <div className="choose-item-icon">
                      <i className="flaticon-car"></i>
                    </div>
                    <div className="choose-item-info">
                      <h3>Best Quality Vehicle</h3>
                      <p>
                        Timeless quality, trusted journeys. Explore our
                        selection of best-quality old vehicles – where
                        reliability meets nostalgia. Your dream ride awaits.
                        🚗✨
                      </p>
                    </div>
                  </div>
                  <div className="choose-item mb-lg-0">
                    <span className="choose-count">03</span>
                    <div className="choose-item-icon">
                      <i className="flaticon-drive-thru"></i>
                    </div>
                    <div className="choose-item-info">
                      <h3>Popular Brands</h3>
                      <p>
                        Discover excellence with the world popular brand Eicher,
                        Mahindra & dongfeng. Popular brands speak volumes in
                        performance, reliability, and style. 🚗🌟
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mt-lg-5">
                  <div className="choose-item">
                    <span className="choose-count">02</span>
                    <div className="choose-item-icon">
                      <i className="flaticon-chauffeur"></i>
                    </div>
                    <div className="choose-item-info">
                      <h3>Certified Mechanics</h3>
                      <p>
                        Peace of mind on the road begins with certified
                        expertise. Our certified mechanics ensure your vehicle
                        is in top-notch condition. Drive with confidence! 🛠️
                      </p>
                    </div>
                  </div>
                  <div className="choose-item mb-lg-0">
                    <span className="choose-count">04</span>
                    <div className="choose-item-icon">
                      <i className="flaticon-online-payment"></i>
                    </div>
                    <div className="choose-item-info">
                      <h3>Reasonable Price</h3>
                      <p>
                        Unbelievable deals on old vehicles! 🚗💸 Don't miss out
                        on your perfect ride at a great value !!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="choose-content">
              <div className={`site-heading`}>
                <span className="site-title-tagline text-white justify-content-start">
                  <i className="flaticon-drive"></i> Why Choose Us
                </span>
                <h2 className="site-title text-white mb-10">
                  We are dedicated <span>to provide</span> quality service
                </h2>
                <p className="text-white">
                  Committed to top-tier service in car resale. Our dedication
                  ensures quality interactions, facilitating smooth transactions
                  for an exceptional and satisfying selling experience.
                </p>
              </div>
              <div className={`choose-img`}>
                <img
                  src={
                    window.location.origin +
                    "/assets/img/slider/Eicher_2016.png"
                  }
                  alt="chooseImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
