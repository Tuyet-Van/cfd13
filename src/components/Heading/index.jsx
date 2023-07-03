import React from "react";

const Heading = ({
  title,
  blueTitle,
  control,
  handleNextClick,
  handlePrevClick,
  noline,
  center,
  headingContent,
  text,
  white,
  rTitle,
}) => {
  return (
    <div
      className={`heading ${noline ? "--noline" : ""} ${
        center ? "--center" : ""
      } ${white ? "--white" : ""}`}
    >
      <h2 className={`heading__title title --t2  ${white ? "--white" : ""}`}>
        {title || ""} <span className="color--primary">{blueTitle || ""}</span>
        {rTitle || ""}
      </h2>
      {control ? (
        <div className="control">
          <div className="control__prev" onClick={handlePrevClick}>
            {white ? (
              <svg
                width={48}
                height={48}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 39L15 24L30 9"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <img src="/img/icon-btn-control.svg" alt="icon prev" />
            )}
          </div>
          <div className="control__next" onClick={handleNextClick}>
            {white ? (
              <svg
                width={48}
                height={48}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 39L15 24L30 9"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <img src="/img/icon-btn-control.svg" alt="icon next" />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {headingContent ? (
        <div className="heading__content">
          <p className="text">{text || ""}</p>
          <div className="control">
            <div className="control__prev" onClick={handlePrevClick}>
              <img src="/img/icon-btn-control.svg" alt="icon prev" />
            </div>
            <div className="control__next" onClick={handleNextClick}>
              <img src="/img/icon-btn-control.svg" alt="icon next" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Heading;
