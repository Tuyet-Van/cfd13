import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import ContactPage from "./pages/ContactPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import CourseOrder from "./pages/CourseOrder";
import PrivacyPage from "./pages/PrivacyPage";
import Page404 from "./pages/Page404";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import MyInfo from "./pages/ProfilePage/MyInfo";
import MyCourses from "./pages/ProfilePage/MyCourses";
import MyPayment from "./pages/ProfilePage/MyPayment";
import PrivateRoute from "./components/PrivateRoute";
import { PATH } from "./constants/pathnames";
import PaymentMethod from "./pages/PaymentMethod";

function App() {
  return (
    <>
      <Routes>
        <Route path={PATH.HOME} element={<MainLayout />}>
          {/* Main */}
          <Route index element={<HomePage />} />
          <Route path={PATH.BLOG} element={<BlogPage />} />
          <Route path={PATH.BLOG_DETAIL} element={<BlogDetail />} />
          <Route path={PATH.ABOUT} element={<AboutPage />} />
          <Route path={PATH.CONTACT} element={<ContactPage />} />
          <Route path={PATH.COURSES} element={<CoursesPage />} />
          <Route path={PATH.COURSE_DETAIL} element={<CourseDetail />} />
          <Route path={PATH.PRIVACY} element={<PrivacyPage />} />
          <Route path={PATH.PAYMENTMETHOD} element={<PaymentMethod />} />
          <Route element={<PrivateRoute />}>
            <Route path={PATH.COURSE_REGISTER} element={<CourseOrder />} />
            <Route path={PATH.PROFILE.INDEX} element={<ProfileLayout />}>
              <Route index element={<MyInfo />} />
              <Route path={PATH.PROFILE.COURSES} element={<MyCourses />} />
              <Route path={PATH.PROFILE.PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
