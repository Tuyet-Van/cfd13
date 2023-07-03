import { Empty, Skeleton, message } from "antd";
import React, { useEffect } from "react";
import CoursesItem from "../../components/CoursesItem";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";

const CoursesPage = () => {
  const { data, loading, error } = useQuery(() => courseService.getCourse());

  const courses = data?.courses || [];

  // console.log("courses :>> ", courses);
  // console.log("loading :>> ", loading);
  // console.log("error :>> ", error);

  useEffect(() => {
    if (error) {
      message.error("Lỗi");
    }
  }, [error]);

  //call API get list courses
  // useEffect(() => {
  //   // courseService
  //   //   .getCourse()
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //     setCourses(response.data?.data?.courses || []);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });

  //   const fetchCourses = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await courseService.getCourse();
  //       setCourses(response.data?.data?.courses || []);
  //     } catch (error) {
  //       console.log(error);
  //       message.error("Dữ liệu lỗi. Vui lòng thử lại!");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu"
              style={{ margin: "0 auto" }}
            />
          )}
          {loading &&
            Array(6)
              .fill("")
              .map((_, index) => (
                <div key={index} className="courses__list-item">
                  <Skeleton
                    active
                    style={{ width: "521.14px", height: "515.13px" }}
                  />
                </div>
              ))}
          {courses?.length > 0 &&
            !loading &&
            courses.map((course, index) => {
              return <CoursesItem key={course.id || index} {...course} />;
            })}
        </div>
      </div>
    </main>
  );
};

export default CoursesPage;
