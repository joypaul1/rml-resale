const RegistrationMobileNumber = ({
  mobileNumber,
  handleMobileNumberChange,
  isMobileNumberValid,
  handleSubmit,
  getBorderColor,
  isSubmitting,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };
  return (
    <form
      
      method="post"
      onSubmit={handleFormSubmit}
      autoComplete="off"
      className="mt-2"
    >
      <div className="form-group">
        <label>
          Enter Your Valid Mobile Number :{" "}
          <i className="fa-regular fa-mobile-alt"></i>{" "}
        </label>

        <div className="input-group mb-3">
          <span className="input-group-text bg-white" id="basic-addon1">
            +88
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: 01XXXXXXXXX"
            aria-label="mobile"
            aria-describedby="basic-addon1"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            style={{ borderColor: getBorderColor() }}
          />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button
          type="submit"
          disabled={!isMobileNumberValid()}
          className="theme-btn"
          style={{
            backgroundColor: !isMobileNumberValid()
              ? "darkslategrey"
              : "#EF1D26",
          }}
        >
          Send OTP <i className="fa-solid fa-comment-sms fa-beat"></i>
        </button>
      </div>
    </form>
  );
};

export default RegistrationMobileNumber;
