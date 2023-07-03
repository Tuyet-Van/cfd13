import React from "react";
import { useAuthen } from "../../components/AuthenContext";
import CoursesItem from "../../components/CoursesItem";

const MyCourses = () => {
  const { courseInfo } = useAuthen();
  const hasCourseInfo = !!courseInfo?.length;

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {hasCourseInfo && (
        <div className="courses__list">
          {courseInfo?.map((course) => (
            <CoursesItem key={course?.course?.id} {...course?.course} />
          ))}
        </div>
      )}
      {!hasCourseInfo && <p className="text">Bạn chưa đăng ký khóa học nào!</p>}
    </div>
  );
};

export default MyCourses;
