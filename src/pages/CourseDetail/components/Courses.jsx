import React from "react";
import Heading from "../../../components/Heading";
import CoursesItem from "../../../components/CoursesItem";

const Courses = (props) => {
  const courseList = props?.courses;
  return (
    <section className="courses">
      <div className="container">
        <Heading title="Khoá học đề xuất" noline center />
        <div className="courses__list">
          {courseList?.length > 0 &&
            courseList
              ?.filter((item) => item?.slug != props.slug)
              .map((item, index) => {
                return <CoursesItem key={item.id || index} {...item} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
