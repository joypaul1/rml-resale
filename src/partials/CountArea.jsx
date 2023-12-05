import axios from "axios";
import { useEffect, useState } from "react";
import { CountUp } from "use-count-up";

function CountArea(props) {
  const [dataList, setDataList] = useState({
    AVAILABLE_VEHICLE: 0,
    AVAILABLE_VEHICLE_TITEL: "",
    HAPPY_CLIENT: 0,
    HAPPY_CLIENT_TITLE: "",
    WORKSHOP_NUMBER: 0,
    WORKSHOP_TITLE: "",
    WORK_ENPERIENCE: 0,
    WORK_ENPERIENCE_TITLE: "",
  });

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          "https://api.rangsmotors.com?file_name=home_helping_data",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.status === "true") {
          setDataList({
            AVAILABLE_VEHICLE: parseInt(data.data.AVAILABLE_VEHICLE, 10),
            AVAILABLE_VEHICLE_TITEL: data.data.AVAILABLE_VEHICLE_TITEL,
            HAPPY_CLIENT: parseInt(data.data.HAPPY_CLIENT, 10),
            HAPPY_CLIENT_TITLE: data.data.HAPPY_CLIENT_TITLE,
            WORKSHOP_NUMBER: parseInt(data.data.WORKSHOP_NUMBER, 10),
            WORKSHOP_TITLE: data.data.WORKSHOP_TITLE,
            WORK_ENPERIENCE: parseInt(data.data.WORK_ENPERIENCE, 10),
            WORK_ENPERIENCE_TITLE: data.data.WORK_ENPERIENCE_TITLE,
          });
        } else {
          console.error("API response status is not true:", data);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCarData();
  }, []);

  
  return (
    <div className="counter-area pt-30 pb-30">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="counter-box">
              <div className="icon">
                <i className="flaticon-car-rental"></i>
              </div>
              <div>
                <span className="counter">
                  <CountUp key={1} isCounting={true} end={dataList.AVAILABLE_VEHICLE} duration={1} />
                </span>
                <h6 className="title">{dataList.AVAILABLE_VEHICLE_TITEL}</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="counter-box">
              <div className="icon">
                <i className="flaticon-car-key"></i>
              </div>
              <div>
                <span className="counter">
                  <CountUp key={2} isCounting={true} end={dataList.HAPPY_CLIENT} duration={5} />
                </span>
                <h6 className="title">{dataList.HAPPY_CLIENT_TITLE}</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="counter-box">
              <div className="icon">
                <i className="flaticon-screwdriver"></i>
              </div>
              <div>
                <span className="counter">
                  <CountUp key={10} isCounting={true} end={dataList.WORKSHOP_NUMBER} duration={3} />
                </span>
                <h6 className="title">{dataList.WORKSHOP_TITLE}</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="counter-box">
              <div className="icon">
                <i className="flaticon-review"></i>
              </div>
              <div>
                <span className="counter">
                  <CountUp key={100} isCounting={true} end={dataList.WORK_ENPERIENCE} duration={1} />
                </span>
                <h6 className="title">{dataList.WORK_ENPERIENCE_TITLE}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountArea;
