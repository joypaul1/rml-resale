import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import ImgSrc from "../components/ImgSrc";

function RelatedCarArea(props) {
  const [carList, setCarList] = useState([]);
  
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `https://api.rangsmotors.com?file_name=brand_wise_product_list&b_id=${props.brand_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = response.data;
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
  }, [props.brand_id]);
  
  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));
  return (
    <div className="car-area bgs pb-10">
      <div className="containers">
        <div className="row">
          {/* Repeat the following block for each car item */}
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
              <div key={index} className="col-md-6 col-lg-4">
                <div
                  className={`car-item animate__animated animate__fadeInUp"`}
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
                    <div className="car-footer">
                      <span className="car-price">
                        <NumericFormat
                          value={carItem.DISPLAY_PRICE}
                          displayType={"text"}
                          thousandSeparator=","
                          allowLeadingZeros
                          decimalScale={2}
                          fixedDecimalScale={true}
                          prefix={"TK "}
                        />
                      </span>

                      <Link
                        to={`/product/${carItem.ID}/${userlogData?.ID || 0}`}
                        className="theme-btn"
                      >
                        <span className="far fa-eye"></span>Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Repeat this block for each car item */}
        </div>
        {/* <div className="text-center mt-4">
          <Link to="#" className="theme-btn">
            View More <i className="far fa-arrow-rotate-right"></i>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default RelatedCarArea;
