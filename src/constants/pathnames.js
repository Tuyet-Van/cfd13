const COURSES_PATH = "/courses";
const PROFILE_PATH = "/profile";
const BLOG_PATH = "/blog";

export const PATH = {
  HOME: "/",
  COURSES: COURSES_PATH,
  COURSE_DETAIL: COURSES_PATH + "/:slug",
  COURSE_REGISTER: "/register/:slug",
  PROFILE: {
    INDEX: PROFILE_PATH,
    COURSES: PROFILE_PATH + "/my-courses",
    PAYMENT: PROFILE_PATH + "/my-payment",
  },
  BLOG: BLOG_PATH,
  BLOG_DETAIL: BLOG_PATH + "/:slug",
  CONTACT: "/contact",
  ABOUT: "/about",
  PRIVACY: "/privacy",
  PAYMENTMETHOD: "/payment-method",
};
