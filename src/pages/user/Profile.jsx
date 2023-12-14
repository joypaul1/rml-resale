import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select2Dp from "../../components/Select2Dp";

function Profile(props) {
  // const [mobileNumber, setMobileNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userDistrict, setUserDistrict] = useState("");
  const [userUpazila, setUserUpazila] = useState("");
  const [userProfile, setUserProfile] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [upazilaList, setUpazilaList] = useState([]);

  const navigate = useNavigate();

  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handleUserAddressChange = (event) => {
    setUserAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    // Mark the function as async
    event.preventDefault();

    try {
      const data = await sendUpdateRequest();

      if (data.status === "true") {
        notifySuccess("Porfile successfully Updated.");

        const storedData = JSON.parse(localStorage.getItem("lg_us_data"));
        storedData.USER_NAME = userName;
        storedData.EMAIL = userEmail;
        storedData.ADDRESS = userAddress;
        localStorage.setItem("lg_us_data", JSON.stringify(storedData));
        
        setUserName(userName);
        setUserEmail(userEmail);
        setUserAddress(userAddress);
        setUserDistrict(userDistrict);
        setUserUpazila(userUpazila);
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      notifyError("Error :", error);
    }
  };

  const sendUpdateRequest = async () => {
    const response = await axios.get(
      `https://api.rangsmotors.com?file_name=user_profile_update&u_id=${userlogData.ID}&u_name=${userName}&u_email=${userEmail}&u_address=${userAddress}&u_dis_id=${userDistrict}&u_up_id=${userUpazila}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return response.json();
  };

  const handleLogout = () => {
    notifySuccess("Logout successfully.");
    setTimeout(async () => {
      navigate("/");
      localStorage.removeItem("lg_us_data");
    }, 1000);
  };

  const userlogData = JSON.parse(localStorage.getItem("lg_us_data"));

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
        

        const res = await response.data;
        if (res.status === "true") {
          const transDisdData = res.district_list.map(({ NAME_ENG, ID }) => ({
            value: ID,
            label: NAME_ENG,
          }));
          setDistrictList(transDisdData);
          setUserProfile(res.user_information);
          setUserName(res.user_information.USER_NAME);
          setUserEmail(res.user_information.EMAIL);
          setUserAddress(res.user_information.ADDRESS);
          setUserDistrict(res.user_information.DISTRICT_ID);
          handleDistrictChange(res.user_information.DISTRICT_ID);
          setUserUpazila(res.user_information.UPAZILA_ID);
        } else {
          console.error("API response status is not true:", res);
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchCommonData();
  }, [userlogData.ID]);
  const handleDistrictChange = async (districtId) => {
   
    setUserDistrict(districtId);
    try {
      const response = await axios.get(
        `https://api.rangsmotors.com?file_name=upazila&dis_id=${districtId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const res = await response.data;

      if (res.status === "true") {
        const transDisdData = res.data.map(({ NAME_ENG, ID }) => ({
          value: ID,
          label: NAME_ENG,
        }));
        setUpazilaList(transDisdData);
      } else {
        console.error("API response status is not true:", res);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };
  const handleUpazilaChange = async (upazilaId) => {
    
    setUserUpazila(upazilaId);
  };

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
                    <Link to="/dashboard">
                      <i className="far fa-layer-group"></i> Bidding Listing
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="active">
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
                <div className="col-lg-12">
                  <div className="user-profile-card">
                    <h4 className="user-profile-card-title">
                      Profile Information
                    </h4>
                    <div className="col-lg-12">
                      <div className="user-profile-form">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              value={userName}
                              className="form-control"
                              placeholder="Your Full Name"
                              onChange={handleUserNameChange}
                            />
                          </div>

                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              value={userEmail}
                              className="form-control"
                              placeholder="Your Email Address"
                              onChange={handleUserEmailChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              value={userAddress}
                              className="form-control"
                              placeholder="Your Adress"
                              onChange={handleUserAddressChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>District</label>
                            <Select2Dp
                              name="district_id"
                              optionProps={districtList}
                              onChange={handleDistrictChange}
                              selectedValue={userDistrict}
                            />
                          </div>

                          <div className="form-group">
                            <label>Upazila</label>
                            <Select2Dp
                              name="upazila_id"
                              optionProps={upazilaList}
                              onChange={handleUpazilaChange}
                              selectedValue={userUpazila}

                            />
                          </div>
                          <div className="d-block text-right">
                            <button type="submit" className=" theme-btn my-3">
                              <span className="far fa-file"></span> Update
                              Profile
                            </button>
                          </div>
                        </form>
                      </div>
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

export default Profile;
