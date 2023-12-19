import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import ImgSrc from "../components/ImgSrc";

function ViewAllProduct(props) {
  const [carList, setCarList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [cashOrder, setCashOrder] = useState("");
  const [creditOrder, setCreditOrder] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setPageNumber(0); // Reset pageNumber when brand changes
  };

  const handleCashOrderChange = (event) => {
    setCreditOrder("");
    setCashOrder(event.target.value);
    setPageNumber(0); // Reset pageNumber when cash order changes
  };

  const handleCreditOrderChange = (event) => {
    setCashOrder("");
    setCreditOrder(event.target.value);
    setPageNumber(0); // Reset pageNumber when credit order changes
  };

  const fetchCarData = async () => {
    console.log(pageNumber, "pageNumber");
    try {
      const url = `https://api.rangsmotors.com?file_name=view_all_product_list&b_id=${selectedBrand}&ca_order=${cashOrder}&cre_order=${creditOrder}&pageNumber=${pageNumber}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.status === "true") {
        setCarList((prevCarList) => {
          return pageNumber >= 1 ? [...prevCarList, ...data.data] : data.data;
        });
      } else {
        console.error("API response status is not true:", data);
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [selectedBrand, cashOrder, creditOrder, pageNumber]);

  const loadMore = (event) => {
    setIsLoading(true);
    setTimeout(() => {
      if (pageNumber === 0) {
        setPageNumber(pageNumber + 2);
      } else {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
      setIsLoading(false);
    }, 1000); // 1000 milliseconds = 1 second
  };

  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));

  return (
    <div className="car-area bg py-50">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="car-sidebar">
              <div className="car-widget">
                <h4 className="car-widget-title">CREDIT PRICE RANGE </h4>
                <ul>
                  <li>
                    <div className="form-check">
                      <input
                        name="pc_range"
                        value={"ASC"}
                        checked={creditOrder === "ASC"}
                        onChange={handleCreditOrderChange}
                        className="form-check-input"
                        type="radio"
                        id={"pc_lo_hg"}
                      />
                      <label className="form-check-label" htmlFor={"pc_lo_hg"}>
                        Low to High
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        name="pc_range"
                        value={"DESC"}
                        checked={creditOrder === "DESC"}
                        onChange={handleCreditOrderChange}
                        className="form-check-input"
                        type="radio"
                        id={"pc_hg_lo"}
                      />
                      <label className="form-check-label" htmlFor={"pc_hg_lo"}>
                        High to Low
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="car-widget">
                <h4 className="car-widget-title">CASH PRICE RANGE </h4>
                <ul>
                  <li>
                    <div className="form-check">
                      <input
                        name="ca_range"
                        value={"ASC"}
                        checked={cashOrder === "ASC"}
                        onChange={handleCashOrderChange}
                        className="form-check-input"
                        type="radio"
                        id={"ca_lo_hg"}
                      />
                      <label className="form-check-label" htmlFor={"ca_lo_hg"}>
                        Low to High
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        name="ca_range"
                        value={"DESC"}
                        checked={cashOrder === "DESC"}
                        onChange={handleCashOrderChange}
                        className="form-check-input"
                        type="radio"
                        id={"ca_hg_lo"}
                      />
                      <label className="form-check-label" htmlFor={"ca_hg_lo"}>
                        High to Low
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="car-widget">
                <h4 className="car-widget-title">BRANDS</h4>
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
                      <label className="form-check-label" htmlFor="brand1">
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
                      <label className="form-check-label" htmlFor="brand2">
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
                      <label className="form-check-label" htmlFor="brand3">
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
              {carList.map((carItem, index) => {
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
                    <div key={index} className="col-md-4 col-lg-4">
                      <div
                        className={`car-item  ${
                          props.scrollDirection === "down"
                            ? "animate__animated animate__fadeInUp"
                            : ""
                        }`}
                      >
                        <div className="car-img">
                          <span className={`car-status ${currentStatus.color}`}>
                            {currentStatus.text}
                          </span>

                          <ImgSrc src={carItem.PIC_URL} />
                        </div>
                        <div className="car-content">
                          <div className="car-top">
                            <h4>
                              <Link
                                to={`/product/${carItem.ID}/${
                                  userlogData?.ID || 0
                                }`}
                              >
                                {carItem.MODEL}
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
                  </>
                );
              })}
              <div className="text-center mt-4">
                {isLoading ? (
                  <img
                    src={
                      window.location.origin + "/assets/img/logo/loader_gif.gif"
                    }
                    alt="Loading..."
                    style={{ width: "100px" }}
                  />
                ) : (
                  <button onClick={loadMore} className="theme-btn">
                    Load More <i className="far fa-arrow-down"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllProduct;
