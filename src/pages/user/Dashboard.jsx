import axios from "axios";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImgSrc from "../../components/ImgSrc";
function Dashboard(props) {
  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));
  const [biddingList, setBiddingList] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    notifySuccess("Logout successfully.");
    setTimeout(async () => {
      navigate("/");
      localStorage.removeItem("lg_us_data");
    }, 1000);
  };

  useEffect(() => {
    const fetchCommonData = async () => {
      try {
        const response = await axios.get(
          `https://api.rangsmotors.com?file_name=user_profile&u_id=${userlogData.ID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const res = response.data;
        if (res.status === "true") {
          setUserProfile(res.user_information);
          setBiddingList(res.bid_information);
        } else {
          console.error("API response status is not true:", res);
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchCommonData();
  }, []);

  return (
    <div className="user-profile py-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="user-profile-sidebar">
              <div className="user-profile-sidebar-top">
                <div className="user-profile-img">
                  <img
                    src={
                      userlogData.PICTURE_LINK ||
                      "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                    }
                    alt=""
                  />
                  <button type="button" className="profile-img-btn">
                    <i className="far fa-camera"></i>
                  </button>
                  <input type="file" className="profile-img-file" />
                </div>
                <h5> {userlogData.USER_NAME} </h5>
                <p>
                  <i
                    className="far solid fa-phone"
                    style={{ color: "#EF1D26" }}
                  ></i>{" "}
                  <span>{userlogData.USER_MOBILE} </span>
                </p>
              </div>
              <ul className="user-profile-sidebar-list">
                <ul className="user-profile-sidebar-list">
                  <li>
                    <Link to="/biddinglist" className="active">
                      <i className="far fa-layer-group"></i> Bidding Listing
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <i className="far fa-user"></i> My Profile
                    </Link>
                  </li>

                  {/* <li>
                    <Link to="/new-vechile">
                      <i className="far fa-plus-circle"></i> New Vehicle For You
                    </Link>
                  </li> */}
                  <li>
                    <Link to="/change-password">
                      <i className="far fa-gear"></i> Change Password
                    </Link>
                  </li>

                  <li>
                    <Link onClick={handleLogout}>
                      <i className="far fa-sign-out"></i> Logout
                    </Link>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="user-profile-wrapper">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="dashboard-widget dashboard-widget-color-1">
                    <div className="dashboard-widget-info">
                      <h1>{userProfile.TOTAL_BID}</h1>
                      <span>Total Bidding</span>
                    </div>
                    <div className="dashboard-widget-icon">
                      <i className="fal fa-list"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="dashboard-widget dashboard-widget-color-3">
                    <div className="dashboard-widget-info">
                      <h1>{userProfile.TOTAL_BID_ACCEPTED}</h1>

                      <span>Accepted Bid</span>
                    </div>
                    <div className="dashboard-widget-icon">
                      <i className="fal fa-layer-group"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="user-profile-card">
                    <h4 className="user-profile-card-title">Bidding Listing</h4>
                    <div className="table-responsive">
                      <table className="table text-nowrap">
                        <thead>
                          <tr>
                            <th>SL.</th>
                            <th>Vehicle Info</th>
                            <th>Bidding Amount</th>
                            {/* <th>Bidding Info</th> */}
                            <th>Bidding Date</th>
                            <th>Bidding Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {biddingList.map((biddingItem, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="table-list-info">
                                    <Link
                                      to={`/product/${biddingItem.ID}/${
                                        userlogData?.ID || 0
                                      }`}
                                    >
                                      <ImgSrc src={biddingItem.PIC_URL} />
                                      <div className="table-ad-content">
                                        <h6>{biddingItem.MODEL}</h6>
                                        <span>
                                          Chs No.: {biddingItem.CHS_NO}
                                        </span>{" "}
                                        <br />
                                        <span>
                                          Brand: {biddingItem.BRAND_NAME}
                                        </span>{" "}
                                        <br />
                                        <span>
                                          Category: {biddingItem.CATEGORY}
                                        </span>{" "}
                                        <br />
                                        CASH Price:{" "}
                                        <NumericFormat
                                          value={biddingItem.CASH_PRICE}
                                          displayType={"text"}
                                          thousandSeparator=","
                                          allowLeadingZeros
                                          decimalScale={2}
                                          fixedDecimalScale={true}
                                          prefix={"TK "}
                                        />
                                        <br />
                                        CREDIT Price:{" "}
                                        <NumericFormat
                                          value={biddingItem.CREDIT_PRICE}
                                          displayType={"text"}
                                          thousandSeparator=","
                                          allowLeadingZeros
                                          decimalScale={2}
                                          fixedDecimalScale={true}
                                          prefix={"TK "}
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                </td>

                                <td>
                                  <NumericFormat
                                    value={biddingItem.BID_AMOUNT}
                                    displayType={"text"}
                                    thousandSeparator=","
                                    allowLeadingZeros
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    prefix={"TK "}
                                  />
                                  <br />
                                  <small>
                                    {" "}
                                    BID FOR{""}: {biddingItem.BID_PRICE_TYPE}
                                  </small> <br />
                                  
                                </td>
                                
                                <td>{biddingItem.BID_ENTRY_DATE}</td>
                                <td className="text-center">
                                  {biddingItem.AUCTION_PENDING_DAY >= "0" ? (
                                    <>
                                      <Link
                                        to={`/product/${biddingItem.ID}/${
                                          userlogData?.ID || 0
                                        }`}
                                        className="badge badge-success"
                                      >
                                        OPEN{" "}
                                        <i className="fa-solid fa-eye fa-beat"></i>
                                      </Link>
                                      <br />
                                      <span className="badge badge-info">
                                        {" "}
                                        Remaining Days{" "}
                                        {biddingItem.AUCTION_PENDING_DAY}{" "}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="badge badge-danger">
                                      CLOSE
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
