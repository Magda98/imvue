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
  currentPage: number;
}

export const useImagesStore = defineStore<string, Data, _GettersTree<Data>>({
  id: "images",
  state: () => ({
    userImages: [],
    userFavImages: [],
    imagesCount: 0,
    currentPage: 0,
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
    async getUserImages(page = 0) {
      const response = await api.getUserImages(page);
      this.userImages = response.data;
      this.currentPage = page;
    },

    async getImagesCount() {
      const response = await api.getImagesCount();
      this.imagesCount = response.data;
    },

    async togleFavouriteImage(id: string) {
      await api.togleFavouriteImage(id);
      this.getAllFav();
    },

    async getAllFav() {
      const userFavImages = [];
      for (let i = 0; ; i++) {
        const response = await api.getFavroites(i);

        if (response.data.length === 0) break;

        userFavImages.push(...response.data);
      }
      this.userFavImages = userFavImages;
    },

    async postImage(image: File) {
      const response = await api.postImage(image);
      this.getUserImages();
      console.log(response);
    },

    async deleteImage(id: string) {
      const response = await api.deleteImage(id);
      this.getUserImages(this.currentPage);
      console.log(response);
    },
  },
});
