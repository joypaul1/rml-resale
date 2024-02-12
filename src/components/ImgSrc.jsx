import React from "react";

function ImgSrc({ src, width, height, styleCsc }) {
  
  let linkSrc = "https://api.rangsmotors.com/?file_name=img_src&imgSr=" + src;
  return <img src={linkSrc} width={width} height={height} style={styleCsc} alt="ImgSource" />;
}

export default ImgSrc;
