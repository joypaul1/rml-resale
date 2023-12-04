function OurDeal(props) {
  return (
    <div className="py-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">
                <i className="flaticon-drive"></i> OUR DEALERS
              </span>
              <h2 className="site-title">
                Best Dealers In <span>Your City</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.75s"
                  : ""
              }`}
              >
              <div className="dealer-img">
                <span className="dealer-listing">Mahindra</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>General Motors</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i> Red Crescent
                    Hospital Road, Paharpur, Dinajpur.
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Md. Foyshal Khan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.25s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Mahindra</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Raihan Motors</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i> Gasspara Bypass
                    Road, Near Gasspara Bus Stand, Pabna Sadar, Pabna.
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Md. Robiul Islam</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.50s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Mahindra</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Tuba Motors</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i> Panchlia Bazar,
                    Salanga, Sirajganj.
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Md. Sohel Rana</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.75s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Mahindra</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Anonno Motors</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i>Adorsho Pouro Bazar,
                    Kurigram.
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Abdul Wadud Mondol</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.75s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Eicher</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Mridha Auto Mobiles</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i> Godhuli Bus Stand,
                    Boalia, Rajshahi.{" "}
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Mohammad Kaisar Nasim </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.25s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Eicher</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Amin Motors</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i>Sarupnagar, Jailkhana
                    moor, Chapainababganj.
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Md. Ruhul Amin</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.50s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Eicher</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Samad Enterprise</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i> Main Road, Naogaon.
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Md. Abdus Samad Promanik</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div
              className={`dealer-item ${
                props.scrollDirection === "down"
                  ? "animate__animated animate__fadeInUp animate__delay-1.75s"
                  : ""
              }`}
            >
              <div className="dealer-img">
                <span className="dealer-listing">Eicher</span>
                <img src="../assets/img/dealer/06.png" alt="" />
              </div>
              <div className="dealer-content">
                <h4>
                  <span>Bakul Motors</span>
                </h4>
                <ul>
                  <li>
                    <i className="far fa-location-dot"></i> Old Bus
                    Stand,Tangail.{" "}
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tag"></i>
                    <span>Utpal Saha</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurDeal;
