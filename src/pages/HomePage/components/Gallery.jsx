import React from "react";
import Heading from "../../../components/Heading";
import useFlickity from "../../../hooks/useFlickity";

const Gallery = (props) => {
  const galleries = props?.galleries;
  const images = galleries?.[0]?.images;

  const { flickityInstance } = useFlickity(
    ".gallery .list",
    {
      contain: true,
      wrapAround: false,
      freeScroll: true,
      cellAlign: "left",
      lazyLoad: 6,
      pageDots: false,
      imagesLoaded: true,
      wrapAround: true,
      prevNextButtons: false,
      autoPlay: true,
      pauseAutoPlayOnHover: false,
    },
    images
  );

  return (
    <section className="gallery">
      <Heading blueTitle="CFD Circle" rTitle=" Là Một Team" noline center />
      <div className="list">
        {images?.length > 0 &&
          images
            ?.filter(
              (item) => !(item.includes("check") || item.includes("icon"))
            )
            .map((item, index) => (
              <img data-flickity-lazyload={item || ""} alt="" key={index} />
            ))}
      </div>
      {/* <div className="controls">
        <div className="btn_ctr prev" />
        <span>Trượt qua</span>
        <div className="timeline">
          <div className="process" />
        </div>
        <div className="btn_ctr next" />
      </div> */}
    </section>
  );
};

export default Gallery;
