import axiosInstance from "../utils/interceptor";

export const orderService = {
  getCourseHistories() {
    return axiosInstance.get(`/orders/courses/me`);
  },
  getPaymentHistories() {
    return axiosInstance.get(`/orders/me`);
  },
  orderCourse(payload = {}) {
    return axiosInstance.post(`/orders`, payload);
  },
};
