import axios from "axios";
import { useEffect, useState } from "react";
import ImgSrc from "../components/ImgSrc";

export default function Team(props) {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Delay the API call by 2 seconds
        const delayedFetch = () => {
          return new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        };

        await delayedFetch(); // Wait for 2 seconds

        const response = await axios.get(
          "https://api.rangsmotors.com/?file_name=resale_team",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        if (data.status === "true") {
          setTeamList(data.data);
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
    <div className="team-area pt-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Team</span>
              <h2 className="site-title">
                Meet With Our <span>Team</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {teamList.map((data, index) => {
            return (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="team-item">
                  <div className="team-img">
                    {data.PIC_URL ? (
                      <ImgSrc src={data.PIC_URL} />
                    ) : (
                      <img
                        src="https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Salesman_1-512.png"
                        alt="defaultLogo"
                      />
                    )}
                  </div>

                  <div className="team-content">
                    <div className="team-bio">
                      <h5>
                        <>{data.TITLE_NAME}</>
                      </h5>
                      <span>
                        <i className="fa-solid fa-universal-access"></i>{" "}
                        {data.DESIGNATION}
                      </span>
                      <br />
                      <span>
                        {" "}
                        <i className="fa-solid fa-mobile"></i> : {data.MOBILE}
                      </span>{" "}
                      <br />
                      <span > <i className="fa-solid fa-location-dot"></i>  : {data.WORK_STATION}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}