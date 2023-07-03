import axiosInstance from "../utils/interceptor";

export const galleryService = {
  getGallery() {
    return axiosInstance.get(`/galleries`);
  },
};
