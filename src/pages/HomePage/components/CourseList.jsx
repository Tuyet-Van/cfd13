import React from "react";
import Heading from "../../../components/Heading";
import CoursesItem from "../../../components/CoursesItem";
import { Link } from "react-router-dom";
import { PATH } from "../../../constants/pathnames";

const CourseList = (props) => {
  const courseList = props?.courses;

  return (
    <section className="courses">
      <div className="container">
        <Heading title="Tất cả" blueTitle="khóa học" />
        <div className="courses__list">
          {courseList?.length > 0 &&
            courseList.map((course, index) => {
              return <CoursesItem key={course.id || index} {...course} />;
            })}
        </div>
        <div className="courses__btnall">
          <Link to={PATH.COURSES} className="course__btn btn btn--grey">
            Tất cả khoá học
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
