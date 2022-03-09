import { defineStore, type _GettersTree } from "pinia";
import api from "../api";

interface Data {
  userImages: Array<{
    link: string;
    views: number;
    id: string;
    favorite: boolean;
  }>;
  userFavImages: Array<{
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
    userFavImages: [],
  }),

  getters: {
    getImagesUrlArray: (state) => {
      return state.userImages.map((item) => item.link);
    },

    getFavArray: (state) => {
      return state.userFavImages.map((item) => item.id);
    },
  },

  actions: {
    async getUserImages() {
      const response = await api.getUserImages();
      this.userImages = response.data;
    },

    async togleFavouriteImage(id: string) {
      const response = await api.togleFavouriteImage(id);
      this.getFavourites();
      console.log(response);
    },

    async getFavourites() {
      const response = await api.getFavroites();
      console.log(response);
      this.userFavImages = response.data;
    },
  },
});
