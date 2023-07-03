import React from "react";
import { Roles } from "../../constants/roles";

const TeacherItem = (props) => {
  //   console.log("props :>> ", props);
  const { name, image, tags, jobTitle, description } = props;

  return (
    <div className="itemteacher">
      <div className="itemteacher__avatar">
        <img src={image} alt="CFD Circle" />
      </div>
      <div className="itemteacher__info">
        <div className="itemteacher__info-name">
          <p className="title --t3">{name}</p>
          <span
            className={`label badge ${
              tags == Roles.Teacher ? "--teacher" : "--mentor"
            }`}
          >
            {tags}
          </span>
        </div>
        <h5 className="itemteacher__info-pos label">{jobTitle}</h5>
        <p className="itemteacher__info-des">{description}</p>
      </div>
    </div>
  );
};

export default TeacherItem;
