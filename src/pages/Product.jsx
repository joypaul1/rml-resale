import axios from "axios";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CountdownTimer from "../components/CountdownTimer";
import DateFormatter from "../components/DateFormatter";
import ImgSrc from "../components/ImgSrc";
import Select2Dp from "../components/Select2Dp";
import UserLoginModal from "../partials/UserLoginModal";

const Product = () => {
  const { product_id } = useParams();
  const [carData, setCarData] = useState([]);
  const [carImage, setCarImage] = useState([]);
  const [relatedcarData, setRelatedcarData] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [refSaleConcern, setRefSaleConcern] = useState(false);
  const [concernList, setConcernList] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState("");
  const [minBidAmount, setMinBidAmount] = useState(0);
  const [selectedBidType, setSelectedBidType] = useState("cash");
  const [selectedReferenceType, setSelectedReferenceType] = useState("my_self");

  const handleBidAmount = (event) => {
    setBidAmount(event.target.value);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };
  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `https://api.rangsmotors.com?file_name=product_details&p_id=${product_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "false") {
          console.log("Failed to fetch car data : " + response.data.message);
        }
        // console.log(response.data.status);
        const data = response.data;
        console.log(data);
        setCarData(data.data);
        if (data.data.CASH_PRICE > 0 && data.data.CREDIT_PRICE > 0) {
          setSelectedBidType("cash");
          setMinBidAmount(data.data.CASH_PRICE);
        } else if (data.data.CASH_PRICE > 0) {
          setSelectedBidType("cash");
          setMinBidAmount(data.data.CASH_PRICE);
        } else if (data.data.CREDIT_PRICE > 0) {
          setSelectedBidType("credit");
          setMinBidAmount(data.data.CREDIT_PRICE);
        }
        setCarImage(data.product_images);
        setRelatedcarData(data.product_related);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCarData();
  }, [product_id]);

  const bidSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(bidAmount) >= parseFloat(minBidAmount)) {
      try {
        const response = await axios.get(
          "https://api.rangsmotors.com?file_name=bid_entry" +
            `&u_id=${userlogData.ID}` +
            `&p_id=${product_id}` +
            `&bid_amount=${bidAmount}` +
            `&bid_type=${selectedBidType}` +
            `&bidf_type=${selectedReferenceType}` +
            `&bid_rs_team_id=${selectedConcern}` +
            `&sis_id=1`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (data.status === "true") {
          notifySuccess("Bid Submit successfully.");
          setBidAmount("");
          setSelectedConcern("");
          setSelectedBidType("cash");
          setSelectedReferenceType("my_self");
          setRefSaleConcern(false);
        } else {
          notifyError(data.message);
        }
      } catch (error) {
        console.error("Error submitting bid:", error);
      }
    } else {
      notifyError(
        "Bid amount should be equal to or greater than Minimun Bid Pirce :"
      );
    }
  };

  // Create a styles object with the variables
  const KeyStyles = {
    color: "#EF1D26",
    fontSize: "18px",
    lineHeight: 1,
  };
  // Create a styles object for countdown styles
  const countdownStyles = {
    countdownArea: {
      borderRadius: "5px",
    },
    countdown: {
      display: "flex",
      justifyContent: "space-between",
    },
    strong: {
      color: "black",
    },
  };
  let images = [];
  carImage.forEach((element) => {
    images.push({
      original:
        "https://api.rangsmotors.com?file_name=img_src&imgSr=" + element.URL,
      thumbnail:
        "https://api.rangsmotors.com?file_name=img_src&imgSr=" + element.URL,
    });
  });
  const handleReferenceByChange = async (e) => {
    setSelectedConcern("");
    setSelectedReferenceType(e.target.value);
    if (e.target.value === "sale_concern") {
      setRefSaleConcern(true);
      try {
        const response = await axios.get(
          "https://api.rangsmotors.com?file_name=resale_team",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data.status === "true") {
          const transformedData = data.data.map(
            ({ RML_ID, TITLE_NAME, ID }) => ({
              value: ID,
              label: `${TITLE_NAME} [${RML_ID}]`,
            })
          );
          setConcernList(transformedData);
        } else {
          console.error("API response status is not true:", data);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    } else {
      setRefSaleConcern(false);
    }
  };
  const handleSaleConcernChange = (seleConcern) => {
    setSelectedConcern(seleConcern);
  };

  const handleBidTypeChange = (e) => {
    setSelectedBidType(e.target.value);

    if (e.target.value === "cash") {
      setMinBidAmount(carData.CASH_PRICE);
    } else {
      setMinBidAmount(carData.CREDIT_PRICE);
    }
  };

  return (
    <div className="shop-item-single bg pt-20">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="car-single-widget">
              <h4 className="mb-4 text-center">Key Information</h4>
              <div className="car-key-info">
                <ul>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i className="fa-solid fa-car" style={KeyStyles}></i>
                      <span>Model :</span>
                      <span>{carData.MODEL}</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-solid fa-gear fa-spin"
                        style={KeyStyles}
                      ></i>
                      <span>Ref Code :</span>
                      <span>{carData.REF_CODE}</span>
                    </div>
                  </li>

                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-brands fa-slack fa-spin"
                        style={KeyStyles}
                      ></i>
                      <span>Chasis :</span>
                      <span>{carData.CHS_NO}</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-solid fa-engine fa-beat"
                        style={KeyStyles}
                      ></i>
                      <span>Engine :</span>
                      <span>{carData.ENG_NO}</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-solid fa-file-pen fa-beat"
                        style={KeyStyles}
                      ></i>
                      <span>Reg :</span>
                      <span>{carData.REG_NO}</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-solid fa-file-pen fa-beat"
                        style={KeyStyles}
                      ></i>
                      <span>Reg Paper:</span>
                      <span>{carData.REG_PAPER}</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-solid fa-car fa-beat-fade"
                        style={KeyStyles}
                      ></i>
                      <span>Body /Seat :</span>
                      <span>{carData.BODY_SIT}</span>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex gap-2 justify-content-start align-items-center">
                      <i
                        className="fa-solid fa-map-marked-alt fa-beat-fade"
                        style={KeyStyles}
                      ></i>
                      <span>Depo :</span>
                      <span>
                        {carData.DEPO_LOCATION &&
                        typeof carData.DEPO_LOCATION === "string"
                          ? carData.DEPO_LOCATION.split(":")[0]
                          : " "}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="item-gallery mb-2">
              <div className="flexslider-thumbnails">
                <ImageGallery
                  autoPlay={true}
                  useTranslate3D={true}
                  infinite={true}
                  showNav={false}
                  showPlayButton={true}
                  items={images}
                />
              </div>
            </div>
          </div>
          {carData.INVOICE_STATUS === "Y" || carData.SALES_STATUS === "Yes" ? (
            <div className="col-lg-3">
              <img
                src={window.location.origin + "/assets/img/logo/sold_out.gif"}
                alt="Loading..."
                style={{ width: "100%", height: "50%" }}
              />
            </div>
          ) : (
            <div className="col-lg-3">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-3 text-center" style={{ color: "#EF1D26" }}>
                    <i className="fas fa-gavel"></i> Bidding/Auction Here
                  </h5>
                </div>
                <div
                  className="countdown-area"
                  style={countdownStyles.countdownArea}
                >
                  <ul
                    className="countdown sidebar-countdown"
                    style={countdownStyles.countdown}
                  >
                    <CountdownTimer
                      countdownStyles={countdownStyles.strong}
                      startTime={carData.AUCTTION_START_DATE}
                      endTime={carData.AUCTION_END_DATE}
                    />
                  </ul>
                </div>
                <hr></hr>
                <span className="px-2">
                  <p>
                    <i
                      className="fa-solid fa-money-bill-1"
                      style={{ color: "#EF1D26" }}
                    ></i>{" "}
                    <span style={{ color: "black" }}> Cash Price Bid : </span>
                    {carData.CASH_PRICE <= 0 ? (
                      <del>
                        <NumericFormat
                          value={carData.CASH_PRICE || ''}
                          displayType={"text"}
                          thousandSeparator=","
                          allowLeadingZeros
                          decimalScale={2}
                          fixedDecimalScale={true}
                          suffix={"TK "}
                        />
                      </del>
                    ) : (
                      <NumericFormat
                        value={carData.CASH_PRICE || ''}
                        displayType={"text"}
                        thousandSeparator=","
                        allowLeadingZeros
                        decimalScale={2}
                        fixedDecimalScale={true}
                        suffix={"TK "}
                      />
                    )}
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-money-bill-1"
                      style={{ color: "#EF1D26" }}
                    ></i>{" "}
                    <span style={{ color: "black" }}> Credit Price Bid : </span>
                    {carData.CREDIT_PRICE <= 0 ? (
                      <del>
                        <NumericFormat
                          value={carData.CREDIT_PRICE || ''}
                          displayType={"text"}
                          thousandSeparator=","
                          allowLeadingZeros
                          decimalScale={2}
                          fixedDecimalScale={true}
                          suffix={"TK "}
                        />
                      </del>
                    ) : (
                      <NumericFormat
                        value={carData.CREDIT_PRICE || ''}
                        displayType={"text"}
                        thousandSeparator=","
                        allowLeadingZeros
                        decimalScale={2}
                        fixedDecimalScale={true}
                        suffix={"TK "}
                      />
                    )}
                  </p>
                  <p>
                    <i
                      className="fa-brands fa-contao"
                      style={{ color: "rgb(239, 29, 38)" }}
                    ></i>{" "}
                    <span style={{ color: "black" }}>
                      {" "}
                      Total Bid : {carData.TOTAL_BID}
                    </span>
                  </p>
                </span>
              </div>
              <div className="car-single-widget text-black mt-2">
                <p className="d-flex justify-content-center border-bottom">
                  <i className="fas fa-gavel" style={{ color: "#EF1D26" }}></i>{" "}
                  Bid For
                </p>
                <span className="d-flex justify-content-center">
                  <div className="form-check form-check-inline">
                    {carData.CASH_PRICE > 0 && (
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="cash"
                        name="bid_for"
                        onChange={handleBidTypeChange}
                        checked={selectedBidType === "cash"}
                      />
                    )}
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Cash
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    {carData.CREDIT_PRICE >= 0 && (
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineCheckbox2"
                        value="credit"
                        name="bid_for"
                        onChange={handleBidTypeChange}
                        checked={selectedBidType === "credit"}
                      />
                    )}

                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      Credit
                    </label>
                  </div>
                </span>
                <span className="d-flex justify-content-center border-bottom mb-2">
                  Reference By
                  <i
                    className="fa-brands fa-searchengin"
                    style={{
                      color: "#EF1D26",
                      marginTop: "3%",
                      fontSize: "20px",
                    }}
                  ></i>{" "}
                </span>
                <span className="d-flex justify-content-center mb-2">
                  <select
                    className="form-select"
                    onChange={handleReferenceByChange}
                    value={selectedReferenceType || ''}
                  >
                    <option value="my_self">Myself</option>
                    <option value="sale_concern">Sale Concern</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </span>
                {refSaleConcern && (
                  <Select2Dp
                    name="selected_concern"
                    optionProps={concernList}
                    onChange={handleSaleConcernChange}
                    selectedValue={selectedConcern || ''}
                  />
                )}

                <div className="car-single-form mt-2">
                  {carData.AUCTION_PENDING >= "0" ? (
                    <form onSubmit={bidSubmit}>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          TK
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          style={{ padding: "1%" }}
                          placeholder="Bid Amount.."
                          aria-label="amount"
                          value={bidAmount || ''}
                          onChange={handleBidAmount}
                          aria-describedby="basic-addon1"
                        />
                      </div>

                      <div className="text-center">
                        {userlogData ? (
                          <button
                            type="submit"
                            className="theme-btn"
                            style={{ padding: "3%" }}
                          >
                            Bid Submit
                            <i className="fas fa-arrow-right-long"></i>
                          </button>
                        ) : (
                          <UserLoginModal
                            previousLink={window.location.pathname}
                          />
                        )}
                      </div>
                    </form>
                  ) : (
                    <div className="text-center">
                      <h3 className="badge bg-info">Bidding Time Close.</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="d-flex  justify-content-start  align-items-center gap-2">
            <div className="col-lg-3 car-single-widgets">
              <div className="car-single-top text-center">
                <span className="car-status status-1">Reconditional</span>
              </div>
              <ul className="text-center car-single-meta">
                <li>
                  <i className="far fa-clock"></i> Listed On:{" "}
                  <DateFormatter dateString={carData.PUBLISHED_DATE} />
                </li>
              </ul>
            </div>
            <div className="col-lg-6 ">
              <div className="p-10">
                <div className="card  text-center">
                  <div className="card-body">
                    <h3 className="">{carData.MODEL}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-item-details">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className="nav-link active"
                id="nav-tab1"
                data-bs-toggle="tab"
                data-bs-target="#tab1"
                type="button"
                role="tab"
                aria-controls="tab1"
                aria-selected="true"
              >
                <i className="fa-brands fa-slack fa-spin"></i> Vehicle Features
              </button>
              {/* <button
                className="nav-link"
                id="nav-tab2"
                data-bs-toggle="tab"
                data-bs-target="#tab2"
                type="button"
                role="tab"
                aria-controls="tab2"
                aria-selected="false"
                tabIndex="-1"
              >
                <i
                  style={{ color: "EF1D26" }}
                  className="fa-regular fa-rectangle-list"
                ></i>{" "}
                Description
              </button> */}
              <button
                className="nav-link"
                id="nav-tab3"
                data-bs-toggle="tab"
                data-bs-target="#tab3"
                type="button"
                role="tab"
                aria-controls="tab3"
                aria-selected="false"
                tabIndex="-1"
              >
                <i
                  style={{ color: "EF1D26" }}
                  className="fa-solid fa-clock-rotate-left fa-spin"
                ></i>{" "}
                Vehicle History
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade active show"
              id="tab1"
              role="tabpanel"
              aria-labelledby="nav-tab1"
            >
              <div className="row mb-3">
                <div className="col-lg-4">
                  <ul className="car-single-list">
                    <li>
                      <i className="far fa-check-circle"></i> Model :{" "}
                      {carData.MODEL}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i> Registation No. :{" "}
                      {carData.REG_NO}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i> Reference Code :{" "}
                      {carData.REF_CODE}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i> Depo Location :{" "}
                      {carData.DEPO_LOCATION &&
                      typeof carData.DEPO_LOCATION === "string"
                        ? carData.DEPO_LOCATION.split(":")[0]
                        : " "}
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <ul className="car-single-list">
                    <li>
                      <i className="far fa-check-circle"></i> Engine No. :{" "}
                      {carData.ENG_NO}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i> Chasis No.:{" "}
                      {carData.CHS_NO}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i> Chasis No.:{" "}
                      {carData.REG_PAPER}
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <ul className="car-single-list">
                    <li>
                      <i className="far fa-check-circle"></i>Body / Sit :{" "}
                      {carData.BODY_SIT}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i>Color :{" "}
                      {carData.COLOR}
                    </li>
                    <li>
                      <i className="far fa-check-circle"></i> Fuel Type :{" "}
                      {carData.FUEL_TYPE}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="nav-tab2"
            >
              <div className="single-additional-info">
                <div
                  dangerouslySetInnerHTML={{ __html: carData.DESCRIPTION }}
                />
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab3"
              role="tabpanel"
              aria-labelledby="nav-tab3"
            >
              <div dangerouslySetInnerHTML={{ __html: carData.HISTORY }} />
            </div>
          </div>
        </div>
        <div className="related-item">
          <div className="row">
            <div className="col-12 mx-auto">
              <div className="site-heading">
                <h2 className="site-title">Related Items</h2>
              </div>
            </div>
          </div>
          <div className="shop-item-wrapper">
            <div className="row">
              {relatedcarData.map((relatedcar, index) => {
                let currentStatus;

                if (relatedcar.INVOICE_STATUS === "Y") {
                  currentStatus = {
                    text: "Sold",
                    color: "status-1", // red color
                  };
                } else if (relatedcar.BOOKED_STATUS === "Y") {
                  currentStatus = {
                    text: "Booked",
                    color: "status-3", // yellow color
                  };
                } else {
                  currentStatus = {
                    text: "Available",
                    color: "status-2", // green color
                  };
                }

                return (
                  <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                    <div className={`car-item`}>
                      <div className="car-img">
                        <span className={`car-status ${currentStatus.color}`}>
                          {currentStatus.text}
                        </span>

                        <ImgSrc src={relatedcar.PIC_URL} />
                      </div>
                      <div className="car-content">
                        <div className="car-top">
                          <h4>
                            <Link to={`/product/${relatedcar.ID}`}>
                              {relatedcar.MODEL}
                            </Link>
                          </h4>
                          <div className="car-rate">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span>5.0 (Review)</span>
                          </div>
                        </div>
                        <ul className="car-list">
                          <li>
                            <i className="fa-solid fa-engine"></i>Engine :{" "}
                            {relatedcar.ENG_NO}
                          </li>
                          <li>
                            <i className="fa-brands fa-slack"></i> Chass :{" "}
                            {relatedcar.CHS_NO}
                          </li>
                          <li>
                            <i className="far fa-file-pen"></i>Reg :{" "}
                            {relatedcar.REG_NO && relatedcar.REG_NO.length > 20
                              ? `${relatedcar.REG_NO.substring(0, 250)}...`
                              : relatedcar.REG_NO}
                          </li>
                        </ul>
                        <div className="car-footer flex-column">
                          <span>
                            <strong>Cash Price : </strong>
                            <span className="car-price">
                              {relatedcar.CASH_PRICE <= 0 ? (
                                <del>
                                  <NumericFormat
                                    value={relatedcar.CASH_PRICE || ''}
                                    displayType={"text"}
                                    thousandSeparator=","
                                    allowLeadingZeros
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    suffix={"TK "}
                                  />
                                </del>
                              ) : (
                                <NumericFormat
                                  value={relatedcar.CASH_PRICE || ''}
                                  displayType={"text"}
                                  thousandSeparator=","
                                  allowLeadingZeros
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  suffix={"TK "}
                                />
                              )}
                            </span>
                          </span>
                          <span>
                            <strong>Credit Price : </strong>
                            <span className="car-price">
                              {relatedcar.CREDIT_PRICE <= 0 ? (
                                <del>
                                  <NumericFormat
                                    value={relatedcar.CREDIT_PRICE || ''}
                                    displayType={"text"}
                                    thousandSeparator=","
                                    allowLeadingZeros
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    suffix={"TK "}
                                  />
                                </del>
                              ) : (
                                <NumericFormat
                                  value={relatedcar.CREDIT_PRICE || ''}
                                  displayType={"text"}
                                  thousandSeparator=","
                                  allowLeadingZeros
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  suffix={"TK "}
                                />
                              )}
                            </span>
                          </span>
                        </div>
                        <span className="d-flex align-items-center justify-content-center mt-2">
                          <Link
                            to={`/product/${relatedcar.ID}/${
                              userlogData?.ID || 0
                            }`}
                            className="theme-btn"
                          >
                            <span className="far fa-eye fa-beat"></span>Details
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
