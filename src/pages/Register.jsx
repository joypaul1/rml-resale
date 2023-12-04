import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OTPForm } from "../components/OPTForm";
import { RegistrationForm } from "../components/RegistrationForm";
import RegistrationMobileNumber from "../components/RegistrationMobileNumber";

const Register = () => {
  const navigate = useNavigate();

  // State variables for managing steps and user input
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission
  const [isHandleRegSubmit, setIsHandleRegSubmit] = useState(false); // State for form submission
  useEffect(() => {
    console.log('render object registration');
  },[]);
  // Toast notification functions
  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  const notifyError = (msg) => {
    toast.warning(msg);
  };

  // for RegistrationMobileNumber Event handlers

  const handleMobileNumberChange = useCallback((event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    if (inputValue.length <= 11) {
      setMobileNumber(inputValue);
    }
  }, []);
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setUserPassword(newPassword);
    const isPasswordLengthValid = newPassword.length >= 4;
    setIsPasswordValid(isPasswordLengthValid);
  };

  const isMobileNumberValid = () => {
    const bdMobileNumberRegex = /^01\d{9}$/;
    return bdMobileNumberRegex.test(mobileNumber);
  };

  const getBorderColor = () => {
    return mobileNumber.length === 0
      ? ""
      : isMobileNumberValid()
        ? "green"
        : "red";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isHandleRegSubmit) {
      return;
    }
    setIsHandleRegSubmit(true);
    try {
      const data = await sendOtpRequest();
      if (data.status === "true") {
        console.log(data.otp_code);
        notifySuccess("OTP sent successfully.");
        setOtpCode(data.otp_code);
        setUserName(data.customer_name);
        setStep1(false);
        setStep3(false);
        setStep2(true);
      } else if (data.status === "false") {
        notifyError(data.message);
      } else {
        notifyError("Error sending OTP");
      }
    } catch (error) {
      setIsSubmitting(false);
      notifyError("Error sending OTP:", error);
    }
  };


  const sendOtpRequest = async () => {
    console.log('send otp request');
    const response = await fetch(
      "https://api.rangsmotors.com?file_name=send_otp&u_num=" + mobileNumber,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  };
  const changeNumber = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setStep1(false);
    setStep2(false);
    setStep3(true);
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await sendRegRequest();
      
      if (data.status === "true") {
        notifySuccess("User registation successfully.");
        setTimeout(async () => {
          navigate("/login");
        }, 1000);
      } else if (data.status === "false") {
        // notifyError(data.message);
        notifySuccess("User registation successfully.");
        setTimeout(async () => {
          navigate("/login");
        }, 1000);
      } else {
        notifyError("Something wrong in SQL server.");
      }
    } catch (error) {
      setIsSubmitting(false);
      notifyError("Error :", error);
    }
  };
  const sendRegRequest = async () => {
    
    const response = await fetch(
      "https://api.rangsmotors.com?file_name=user_registration&u_num=" +
        mobileNumber +
        "&u_pass=" +
        userPassword +
        "&u_name=" +
        userName +
        "&u_otp=" +
        otpCode,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };
  return (
    <div className="login-area pt-40">
      <div className="container">
        <div className="col-md-5 mx-auto">
          <div className="login-form">
            <div className="login-header">
              <img
                src={window.location.origin + "/assets/img/logo/logo.png"}
                alt="logo"
              />
            </div>
            {/* Rendering components based on steps */}
            {step1 && (
              <RegistrationMobileNumber
                mobileNumber={mobileNumber}
                handleMobileNumberChange={handleMobileNumberChange}
                isMobileNumberValid={isMobileNumberValid}
                handleSubmit={handleSubmit}
                getBorderColor={getBorderColor}
                isSubmitting={isSubmitting}
              />
            )}
            {step2 && (
              <OTPForm
                otpCode={otpCode}
                onResendOTP={sendOtpRequest}
                changeNumber={changeNumber}
                handleOTPSubmit={handleOTPSubmit}
              />
            )}
            {step3 && (
              <RegistrationForm
                userName={userName}
                mobileNumber={mobileNumber}
                handleUserNameChange={handleUserNameChange}
                handlePassword={handlePassword}
                handleRegSubmit={handleRegSubmit}
                isPasswordValid={isPasswordValid}
              />
            )}
            <div className="login-footer">
              <p>
                Already have an account? <Link to="/login">Login.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Register);
