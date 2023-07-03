import axiosInstance from "../utils/interceptor";

export const subscribesService = {
  subscribes(payload = {}) {
    return axiosInstance.post(`subscribes`, payload);
  },
};
