import axiosInstance from "../utils/interceptor";

export const rateService = {
  getRates() {
    return axiosInstance.get(`/rates`);
  },
};
