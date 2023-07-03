import React from "react";
import { Roles } from "../../constants/roles";
import { Link } from "react-router-dom";
import { PATH } from "../../constants/pathnames";
import { formatCurrency, formatDateDisplay } from "../../utils/format";

const CoursesItem = (props) => {
  const {
    slug,
    image,
    tags,
    title,
    name,
    teams,
    price,
    startDate,
    type = "normal",
  } = props || {};
  const teacherInfo = teams?.find((member) =>
    member.tags?.includes(Roles.Teacher)
  );

  if (type == "coming") {
    return (
      <div className="coursecoming__item">
        <div className="coursecoming__item-img">
          <Link to={PATH.COURSES + `/${slug}`}>
            <img src={image} alt="Khóa học sắp ra mắt CFD" />
          </Link>
        </div>
        <div className="coursecoming__item-content">
          <p className="category label">Front-end</p>
          <h2 className="title --t2">
            <Link to={PATH.COURSES + `/${slug}`}>{name}</Link>
          </h2>

          <div className="user">
            {teacherInfo && (
              <>
                <div className="user__img">
                  <img src={teacherInfo.image} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfo.name}</p>
              </>
            )}
          </div>
          <div className="info">
            <div className="labeltext">
              <span className="label --blue">Ngày khai giảng</span>
              <p className="title --t2">{formatDateDisplay(startDate)}</p>
            </div>
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2"> {tags.join(" | ") || ""}</p>
            </div>
          </div>
          <div className="btnwrap">
            <Link
              to={`/register/${slug}`}
              className="btn btn--primary"
              // onClick={handleRegisterCourse}
            >
              Đăng Ký Học
            </Link>
            <Link
              to={PATH.COURSES + `/${slug}`}
              className="btn btn--border --black"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={PATH.COURSES + `/${slug}`}>
            <img src={image} alt={slug} className="course__thumbnail" />
            {tags && (
              <span className="course__img-badge badge">
                {tags.join(" | ") || ""}
              </span>
            )}
          </Link>
        </div>
        <div className="content">
          <p className="label">{name}</p>
          <h3 className="title --t3">
            <Link to={PATH.COURSES + `/${slug}`}>{title}</Link>
          </h3>
          <div className="content__info">
            <div className="user">
              {teacherInfo && (
                <>
                  <div className="user__img">
                    <img src={teacherInfo.image} alt="Avatar teacher" />
                  </div>
                  <p className="user__name">{teacherInfo.name}</p>
                </>
              )}
            </div>
            <div className="price">
              <strong>{formatCurrency(price)} đ</strong>
            </div>
          </div>
          <div className="content__action">
            <Link to={`/register/${slug}`} className="btn btn--primary">
              Đăng ký ngay
            </Link>
            <Link to={PATH.COURSES + `/${slug}`} className="btn btn--default">
              <img src="/img/icon-paper.svg" alt="icon paper" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default CoursesItem;
