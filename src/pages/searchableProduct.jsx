import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useParams } from "react-router-dom";
import ImgSrc from "../components/ImgSrc";
import RelatedCarArea from "../partials/RelatedCarArea";

function SearchableProduct(props) {
  const { selectedModel, selectedBrandId } = useParams();
  const [carList, setCarList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(selectedBrandId);

  const handleBrandChange = (event) => {
    const brandId = event.target.value;
    setSelectedBrand(brandId);
  };

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `https://api.rangsmotors.com?file_name=search_list&md_name=${selectedModel}&brand_id=${selectedBrand}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.status === "true") {
          setCarList(data.data);
        } else {
          console.error("API response status is not true:", data);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, [selectedModel, selectedBrand]);

  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));

  return (
    <div className="car-area bg py-50">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="car-sidebar">
              <div className="car-widget">
                <h4 className="car-widget-title">Brands</h4>
                <ul>
                  <li>
                    <div className="form-check">
                      <input
                        name="brand"
                        value={1}
                        checked={selectedBrand === "1"}
                        onChange={handleBrandChange}
                        className="form-check-input"
                        type="radio"
                        id="brand1"
                      />
                      <label className="form-check-label" for="brand1">
                        Eicher{" "}
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        name="brand"
                        value={2}
                        checked={selectedBrand === "2"}
                        onChange={handleBrandChange}
                        className="form-check-input"
                        type="radio"
                        id="brand2"
                      />
                      <label className="form-check-label" for="brand2">
                        {" "}
                        Mahindra
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        name="brand"
                        value={3}
                        checked={selectedBrand === "3"}
                        onChange={handleBrandChange}
                        className="form-check-input"
                        type="radio"
                        id="brand3"
                      />
                      <label className="form-check-label" for="brand3">
                        {" "}
                        DongFeng
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {carList.length === 0 ? (
                <>
                  <strong
                    style={{ color: "rgb(239, 29, 38)" }}
                    className="shadow p-3 mb-5 bg-body rounded"
                  >
                    We appreciate your interest ! Unfortunately, the requested
                    product is currently unavailable. Please explore our current
                    product list as referred below :-
                  </strong>
                </>
              ) : (
                carList.map((carItem, index) => {
                  let currentStatus;

                  if (carItem.INVOICE_STATUS === "Y") {
                    currentStatus = {
                      text: "Sold",
                      color: "status-1", // red color
                    };
                  } else if (carItem.BOOKED_STATUS === "Y") {
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
                    <>
                      <div key={index} className="col-md-6 col-lg-4">
                        <div
                          className={`car-item  ${
                            props.scrollDirection === "down"
                              ? "animate__animated animate__fadeInUp"
                              : ""
                          }`}
                        >
                          <div className="car-img">
                            <span
                              className={`car-status ${currentStatus.color}`}
                            >
                              {currentStatus.text}
                            </span>

                            <ImgSrc src={carItem.PIC_URL} />
                          </div>
                          <div className="car-content">
                            <div className="car-top">
                              <h4>
                                <Link to="/Product">{carItem.MODEL}</Link>
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
                                {carItem.ENG_NO}
                              </li>
                              <li>
                                <i className="fa-brands fa-slack"></i> Chass :{" "}
                                {carItem.CHS_NO}
                              </li>
                              <li>
                                <i className="far fa-file-pen"></i>Reg :{" "}
                                {carItem.REG_NO}
                              </li>
                            </ul>
                            <div className="car-footer flex-column">
                              <span>
                                <strong>Cash Price : </strong>
                                <span className="car-price">
                                  <NumericFormat
                                    value={carItem.CASH_PRICE}
                                    displayType={"text"}
                                    thousandSeparator=","
                                    allowLeadingZeros
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    suffix={"TK "}
                                  />
                                </span>
                              </span>
                              <span>
                                <strong>Credit Price : </strong>
                                <span className="car-price">
                                  <NumericFormat
                                    value={carItem.CREDIT_PRICE}
                                    displayType={"text"}
                                    thousandSeparator=","
                                    allowLeadingZeros
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    suffix={"TK "}
                                  />
                                </span>
                              </span>
                            </div>
                            <span className="d-flex align-items-center justify-content-center mt-2">
                              <Link
                                to={`/product/${carItem.ID}/${
                                  userlogData?.ID || 0
                                }`}
                                className="theme-btn"
                              >
                                <span className="far fa-eye fa-beat"></span>
                                Details
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="site-heading">
                        <h2 className="site-title">Brand Wise Items</h2>
                      </div>
                    </>
                  );
                })
              )}

              <RelatedCarArea brand_id={selectedBrand} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchableProduct;
