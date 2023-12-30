import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImgSrc from "../components/ImgSrc";
import RelatedCarArea from "../partials/RelatedCarArea";

function SearchableProduct() {
  const { selectedModel, selectedBrandId, selectedCategory } = useParams();
  const [selectedBrand] = useState(selectedBrandId ?? "");
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedGrade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [carList, setCarList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [cashOrder, setCashOrder] = useState("");
  const [creditOrder, setCreditOrder] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const navigate = useNavigate();

  const handleBrandChange = (event) => {
    navigate(`/view-all-product/${event.target.value}`);
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

  const handleModelChange = (event) => {
    setPageNumber(0); // Reset pageNumber when credit order changes
    navigate(
      `/searchable-product/${event.target.value}/${selectedBrand}/${selectedCategory}`
    );
  };
  const fetchCarData = async () => {
    try {
      const encodedModel = encodeURIComponent(selectedModel);
      const url = `https://api.rangsmotors.com?file_name=search_list&md_name=${encodedModel}&b_id=${selectedBrand}&ca_order=${cashOrder}&cre_order=${creditOrder}&pageNumber=${pageNumber}&grade=${selectedGrade}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.status === "true") {
        setCarList((prevCarList) => {
          return pageNumber > 0 ? [...prevCarList, ...data.data] : data.data;
        });
        if (!initialLoadComplete) {
          setInitialLoadComplete(true);
        }
        // Check if there's more data available in the response
        if (data.data.length === 0) {
          setHasMoreData(false); // No more data available
        }
      } else {
        console.error("API response status is not true:", data);
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after API request is completed
    }
  };

  const fetchModelData = async () => {
    try {
      const response = await axios.get(
        `https://api.rangsmotors.com?file_name=model_list&cat_name=${selectedCategory}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.status === "true") {
        setModelList(data.data);
      } else {
        console.error("API response status is not true:", data);
      }
    } catch (error) {
      console.error("Error fetching car model data:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true); // Set loading to true initially
    const timer = setTimeout(() => {
      setIsLoading(false); // After 1 second, set loading to false
    }, 2000);

    fetchCarData();
    fetchModelData();
    return () => clearTimeout(timer);
  }, [
    selectedBrand,
    selectedCategory,
    selectedModel,
    cashOrder,
    creditOrder,
    pageNumber,
    initialLoadComplete,
  ]);

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

  return (
    <div className="car-area bg py-50">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-3">
            <div className="car-sidebar">
              <div className="car-widget">
                <h4 className="car-widget-title">{selectedCategory} MODEL </h4>
                <ul>
                  {modelList.map((modelData, indexkey) => {
                    return (
                      <li key={indexkey}>
                        <div className="form-check" key={indexkey}>
                          <input
                            name="model"
                            value={modelData.NAME}
                            checked={selectedModel === modelData.NAME}
                            onChange={handleModelChange}
                            className="form-check-input"
                            type="radio"
                            id={"model_" + indexkey}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={"model_" + indexkey}
                          >
                            {modelData.NAME}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

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
              {!initialLoadComplete ||
                (carList.length === 0 && (
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
                            Eicher
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
                            DongFeng
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-9">
            <div className="row">
              {carList.map((carItem, index) => {
                let currentStatus;

                if (
                  carItem.INVOICE_STATUS === "Y" ||
                  carItem.SALES_STATUS === "Yes"
                ) {
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
                  <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                    <div className={`car-item`}>
                      <div className="car-img">
                        <span className={`car-status ${currentStatus.color}`}>
                          {currentStatus.text}
                        </span>

                        <ImgSrc src={carItem.PIC_URL} />
                      </div>
                      <div className="car-content">
                        <div className="car-top">
                          <h4>
                            <Link to={`/product/${carItem.ID}`}>
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
                            {carItem.REG_NO && carItem.REG_NO.length > 20
                              ? `${carItem.REG_NO.substring(0, 250)}...`
                              : carItem.REG_NO}
                          </li>
                        </ul>
                        <div className="car-footer flex-column">
                          <span>
                            <strong>Cash Price : </strong>
                            <span className="car-price">
                              {carItem.CASH_PRICE <= 0 ? (
                                <del>
                                  <NumericFormat
                                    value={carItem.CASH_PRICE}
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
                                  value={carItem.CASH_PRICE}
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
                              {carItem.CREDIT_PRICE <= 0 ? (
                                <del>
                                  <NumericFormat
                                    value={carItem.CREDIT_PRICE}
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
                                  value={carItem.CREDIT_PRICE}
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
                            to={`/product/${carItem.ID}`}
                            className="theme-btn"
                          >
                            <span className="far fa-eye fa-beat"></span>
                            Details
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {!initialLoadComplete ||
                (carList.length === 0 && (
                  <>
                    <strong
                      style={{ color: "rgb(239, 29, 38)" }}
                      className="shadow p-3 mb-5 bg-body rounded"
                    >
                      We appreciate your interest ! Unfortunately, the requested
                      product is currently unavailable. Please explore our
                      current product list as referred below :-
                    </strong>
                    <RelatedCarArea brand_id={selectedBrand} />
                  </>
                ))}
              {initialLoadComplete && hasMoreData && (
                <div className="text-center mt-4">
                  {isLoading ? (
                    <img
                      src={
                        window.location.origin +
                        "/assets/img/logo/loader_gif.gif"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchableProduct;
