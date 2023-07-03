import axiosInstance from "../utils/interceptor";

export const courseService = {
  getCourse(query = "") {
    return axiosInstance.get(`/courses${query}`);
  },
  getCourseBySlug(slug = "") {
    return axiosInstance.get(`/courses${slug ? "/" + slug : ""}`);
  },
};
