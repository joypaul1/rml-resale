import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from 'react-elastic-carousel';


import ImgSrc from "../components/ImgSrc";

function Testimonials() {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const delayedFetch = () => {
          return new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        };

        await delayedFetch(); // Wait for 4 seconds

        const response = await axios.get(
          "https://api.rangsmotors.com?file_name=client_comments",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const res = response.data;
        if (res.status === "true") {
          setCommentList(res.data);
        } else {
          console.error("API response status is not true:", res);
        }
      } catch (error) {
        console.error("Error fetching COMMENT data:", error);
      }
    };

    fetchCommentData();
  }, []);

  

  return (
    <div className="testimonial-area bg py-60">
      <div className="containers">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">
                <i className="flaticon-drive"></i> Testimonials
              </span>
              <h2 className="site-title">
                What Our Client <span>Says</span>
              </h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <Carousel enableAutoPlay autoPlaySpeed={1500} itemPosition={2} itemsToShow={2}  
          disableArrowsOnEnd={true} className="d-flex align-self-center">
          {commentList.map((commentItem, index) => {
            return (
              <div key={index} className=" testimonial-single">
                <div className="testimonial-content">
                  <div className="testimonial-author-img">
                    {commentItem.PIC_URL ? (
                      <ImgSrc src={commentItem.PIC_URL} />
                    ) : (
                      <img
                        src="https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Salesman_1-512.png"
                        alt="defaultLogo"
                      />
                    )}
                    
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{commentItem.NAME}</h4>
                    <p>Customer</p>
                  </div>
                </div>
                <div className="testimonial-quote">
                  <p
                    dangerouslySetInnerHTML={{ __html: commentItem.COMMENTS }}
                  />
                </div>
                <div className="testimonial-rate">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Testimonials;
