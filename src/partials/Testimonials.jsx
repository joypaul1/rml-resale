import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import ImgSrc from "../components/ImgSrc";

function Testimonials() {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        // Delay the API call by 4 second
        const delayedFetch = () => {
          return new Promise((resolve) => {
            setTimeout(resolve, 4000);
          });
        };
  
        await delayedFetch(); // Wait for 4 second
  
        const response = await fetch(
          "https://api.rangsmotors.com?file_name=client_comments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const res = await response.json();
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
  

  // Owl Carousel Settings
  const options = {
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  };

  return (
    <div className="testimonial-area bg py-60">
      <div className="container">
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
        <OwlCarousel
          className="testimonial-slider owl-carousel owl-theme"
          {...options}
        >
          {commentList.map((commentItem, index) => {
            return (
              <div key={index} className="testimonial-single">
                <div className="testimonial-content">
                  <div className="testimonial-author-img">
                    <ImgSrc src={commentItem.PIC_URL} />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{commentItem.NAME}</h4>
                    <p>Customer</p>
                  </div>
                </div>
                <div className="testimonial-quote">
                  <span className="testimonial-quote-icon">
                    <i className="flaticon-quote-hand-drawn-symbol"></i>
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: commentItem.COMMENTS }} />

                  
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
        </OwlCarousel>
      </div>
    </div>
  );
}

export default Testimonials;
