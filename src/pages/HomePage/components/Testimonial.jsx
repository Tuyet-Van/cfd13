import React, { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import useFlickity from "../../../hooks/useFlickity";

const Testimonial = (props) => {
  const rateList = props?.rates;

  const { flickityInstance, handleNextClick, handlePrevClick } = useFlickity(
    ".testimonial__slider .images .list",
    {
      contain: true,
      wrapAround: false,
      freeScroll: false,
      cellAlign: "center",
      lazyLoad: 2,
      imagesLoaded: true,
      prevNextButtons: false,
      dragThreshold: 0,
      on: {
        ready: () => {
          let dotsSlideTes = document.querySelector(
            ".testimonial__slider .flickity-page-dots"
          );
          let dotsNew = document.querySelector(".testimonial__slider .dots");

          dotsNew?.appendChild(dotsSlideTes); // Append dotsSlideTes to dotsNew
        },
        change: (index) => {
          document
            .querySelectorAll(".testimonial__slider .ct")
            .forEach((ct) => ct.classList.remove("active"));
          document
            .querySelector(`.testimonial__slider .ct-${index + 1}`)
            ?.classList.add("active");
        },
      },
    },
    rateList
  );

  useEffect(() => {
    const $imgs = document.querySelectorAll(
      ".testimonial__slider .carousel-cell picture img"
    );
    const handleScroll = (event, progress) => {
      $imgs.forEach((img, i) => {
        const x =
          ((flickityInstance.current.slides[i].target +
            flickityInstance.current.x) *
            -1) /
          2;
        img.style.transform = `translateX(${x}px)`;
      });
    };

    if (flickityInstance.current !== null) {
      flickityInstance.current.on("scroll", handleScroll);
    }

    return () => {
      if (flickityInstance.current !== null) {
        flickityInstance.current.off("scroll", handleScroll);
      }
    };
  });

  return (
    <section className="testimonial --scpadding">
      <div className="container">
        <div className="testimonial__inner">
          <Heading
            blueTitle="Cảm nhận"
            rTitle=" học viên"
            control
            white
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
          />
          <div className="testimonial__slider">
            <div className="testimonial__slider-list">
              <div className="item">
                <div className="text">
                  {rateList?.length > 0 &&
                    rateList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`ct ct-${index + 1} ${
                            index == 0 ? "active" : ""
                          }`}
                        >
                          <div className="info">
                            <div className="name">
                              <h4 className="title --t3 --white">
                                {item.name || ""}
                              </h4>
                            </div>
                          </div>
                          <div className="content">
                            {item.description || ""}
                          </div>
                          <div className="bottom">
                            <span className="label">{item.tag || ""}</span>
                            <a href={item.linkFacebook || ""} target="_blank">
                              <img src="/img/facebook.svg" alt="" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="images">
                  <div className="list">
                    {rateList?.length > 0 &&
                      rateList.map((item, index) => (
                        <div key={index} className="carousel-cell">
                          <div className="img">
                            <picture>
                              <source
                                media="(max-width: 767px)"
                                srcSet={item.image || ""}
                              />
                              <img
                                data-flickity-lazyload={item.image || ""}
                                alt=""
                              />
                            </picture>
                          </div>
                          <div className="ct_m">
                            <div className="info">
                              <div className="name">
                                <h4 className="title --t3 --white">
                                  {item.name || ""}
                                </h4>
                              </div>
                            </div>
                            <div className="content">
                              {item.description || ""}
                            </div>
                            <div className="bottom">
                              <span className="label">{item.tag || ""}</span>
                              <a href={item.linkFacebook || ""} target="_blank">
                                <img src="/img/facebook.svg" alt="" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="dots" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
