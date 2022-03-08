import { defineStore, type _GettersTree } from "pinia";
import api from "../api";

interface Data {
  userImages: Array<{
    link: string;
    views: number;
    id: string;
    favorite: boolean;
  }>;
}

export const useImagesStore = defineStore<string, Data, _GettersTree<Data>>({
  id: "images",
  state: () => ({
    userImages: [],
  }),

  getters: {
    getImagesUrlArray: (state) => {
      return state.userImages.map((item) => item.link);
    },
  },

  actions: {
    async getUserImages() {
      const response = await api.getUserImages();
      console.log(response);
      this.userImages = response.data;
    },

    async togleFavouriteImage(id: string) {
      const response = await api.togleFavouriteImage(id);
      console.log(response);
    },
  },
});
