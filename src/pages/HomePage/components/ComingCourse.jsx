import React from "react";
import Heading from "../../../components/Heading";
import useFlickity from "../../../hooks/useFlickity";
import CoursesItem from "../../../components/CoursesItem";

const ComingCourse = (props) => {
  const courseList = props?.courses;

  const { handleNextClick, handlePrevClick } = useFlickity(
    "#coursecoming__slider",
    {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      dragThreshold: 0,
      wrapAround: true,
    },
    courseList
  );

  return (
    <section className="coursecoming --scpadding">
      <div className="container">
        <Heading
          title="Khoá học Test2"
          blueTitle="sắp khai giảng"
          control
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
      <div className="coursecoming__list" id="coursecoming__slider">
        {courseList?.length > 0 &&
          courseList.map((course, index) => {
            return (
              <CoursesItem key={course.id || index} type="coming" {...course} />
            );
          })}
      </div>
    </section>
  );
};

export default ComingCourse;
