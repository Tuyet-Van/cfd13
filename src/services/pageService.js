import axiosInstance from "../utils/interceptor";

export const pageService = {
  getHomePage() {
    return axiosInstance.get(`/pages/home`);
  },
  getAboutPage() {
    return axiosInstance.get(`/pages/about`);
  },
};
