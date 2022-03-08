import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.imgur.com/3/",
});

const api = {
  async getUserData(username: string | null) {
    const response = await apiClient.get(`/account/${username}`);
    return response.data;
  },

  async getUserImages() {
    const response = await apiClient.get(`/account/me/images`);
    return response.data;
  },

  async togleFavouriteImage(id: string) {
    console.log(id);
    const response = await apiClient.post(`/image/${id}/favorite`);
    return response.data;
  },
};

export default api;
