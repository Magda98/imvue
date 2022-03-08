import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.imgur.com",
});

const api = {
  async getUserData(username: string | null) {
    const response = await apiClient.get(`/3/account/${username}`);
    return response.data;
  },

  async getUserImages() {
    const response = await apiClient.get(`3/account/me/images`);
    return response.data;
  },
};

export default api;
