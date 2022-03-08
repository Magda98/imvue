import { defineStore } from "pinia";
import api from "../api";

interface Data {
  userImages: Array<{
    link: string;
    views: number;
    id: string;
  }>;
}

export const useImagesStore = defineStore({
  id: "images",
  state: () =>
    ({
      userImages: [],
    } as Data),

  getters: {
    getImagesUrlArray: (state) => {
      return state.userImages.map((item) => item.link);
    },
  },

  actions: {
    async getUserImages() {
      const response = await api.getUserImages();
      this.userImages = response.data;
    },
  },
});
