import axiosInstance from "../utils/interceptor";

export const teamsService = {
  getTeams() {
    return axiosInstance.get(`/teams`);
  },
};
