import React from "react";

function ImgSrc({ src, width, height }) {
  let linkSrc = "https://api.rangsmotors.com?file_name=img_src&imgSr=" + src;
  return <img src={linkSrc} width={width} height={height} alt="ImgSource" />;
}

export default ImgSrc;
