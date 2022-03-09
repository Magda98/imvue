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
  imagesCount: number;
  page: number;
}

export const useImagesStore = defineStore<string, Data, _GettersTree<Data>>({
  id: "images",
  state: () => ({
    userImages: [],
    userFavImages: [],
    imagesCount: 0,
    page: 0,
  }),

  getters: {
    getImagesUrlArray: (state) => {
      return state.userImages.map((item) => item.link);
    },

    getFavUrlArray: (state) => {
      return state.userFavImages.map((item) => item.link);
    },

    getFavArray: (state) => {
      return state.userFavImages.map((item) => item.id);
    },

    getPagesCount: (state) => {
      const n = Math.ceil(state.imagesCount / 50.0);
      return Array.from({ length: n }, (_, index) => index + 1);
    },

    getMaxPagesCount: (state) => {
      const n = Math.ceil(state.imagesCount / 50.0);
      return n;
    },
  },

  actions: {
    async getUserImages() {
      const response = await api.getUserImages(this.page);
      this.userImages = response.data;
    },

    async getImagesCount() {
      const response = await api.getImagesCount();
      console.log(response);
      this.imagesCount = response.data;
    },

    async togleFavouriteImage(id: string) {
      const response = await api.togleFavouriteImage(id);
      this.getFavourites();
    },

    async getFavourites() {
      const response = await api.getFavroites();
      this.userFavImages = response.data;
    },
  },
});
