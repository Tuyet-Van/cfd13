import axiosInstance from "../utils/interceptor";

export const questionService = {
  getQuestion(query = "") {
    return axiosInstance.get(`/questions${query}`);
  },
  getgetQuestionById(id = "") {
    return axiosInstance.get(`/questions${id ? "/" + id : ""}`);
  },
};
