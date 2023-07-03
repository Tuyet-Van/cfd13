import axiosInstance from "../utils/interceptor";

export const blogService = {
  getBlogCategories() {
    return axiosInstance.get(`/blog-categories`);
  },
  getBlogList(query = "") {
    return axiosInstance.get(`/blogs${query ? "?category=" + query : ""}`);
  },
  getBlogBySlug(slug = "") {
    return axiosInstance.get(`/blogs${slug ? "/" + slug : ""}`);
  },
};
