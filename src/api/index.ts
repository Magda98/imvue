import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.imgur.com/3/",
});

const api = {
  async getUserData(username: string | null) {
    const response = await apiClient.get(`/account/${username}`);
    return response.data;
  },

  async getUserImages(page: number) {
    const response = await apiClient.get(`/account/me/images/${page}`);
    return response.data;
  },

  async getImagesCount() {
    const response = await apiClient.get(`/account/me/images/count`);
    return response.data;
  },

  async togleFavouriteImage(id: string) {
    const response = await apiClient.post(`/image/${id}/favorite`);
    return response.data;
  },

  async getFavroites(page: number) {
    const response = await apiClient.get(`account/me/favorites/${page}`);
    console.log(response.data);
    return response.data;
  },

  async postImage(image: string) {
    const formdata = new FormData();
    formdata.append("image", image);
    const response = await apiClient.post(`/image`, formdata);
    return response.data;
  },

  async deleteImage(id: string) {
    const response = await apiClient.delete(`/image/${id}`);
    return response;
  },
};

export default api;
