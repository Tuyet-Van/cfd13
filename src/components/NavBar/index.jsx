import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../constants/pathnames";

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar__main">
          <li className="navbar__link">
            <NavLink to={PATH.HOME} className="navbar__item">
              Trang chủ
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATH.ABOUT} className="navbar__item">
              Về CFD Circle
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATH.COURSES} className="navbar__item">
              Khóa học
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATH.BLOG} className="navbar__item">
              Bài viết
            </NavLink>
          </li>
          <li className="navbar__link">
            <NavLink to={PATH.CONTACT} className="navbar__item">
              Liên hệ
            </NavLink>
          </li>
        </ul>
        <div className="navbar__overlay" />
      </nav>
    </>
  );
};

export default NavBar;
