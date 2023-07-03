import React from "react";

const Feature = (props) => {
  const featuredList = props?.data?.special;

  return (
    <section className="featured">
      <img src="/img/icon-cfd.svg" alt="" className="featured__c" />
      <div className="container">
        <div className="featured__title">
          <h2 className="title --t2 --white">
            Những điều <br />
            <span>Đặc biệt</span> Tại CFD
          </h2>
        </div>
        <div className="featured__content">
          {featuredList?.length > 0 &&
            featuredList.map((item, index) => {
              return (
                <div className="featured__content-item" key={item.id || index}>
                  <h3 className="title --t3 --white">{item.title || ""}</h3>
                  <p>{item.description || ""}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Feature;
