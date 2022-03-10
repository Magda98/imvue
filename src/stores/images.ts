import { defineStore, type _GettersTree } from "pinia";
import api from "../api";
import { useSnackbarStore } from "./snackbar";

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
    snackbar() {
      const snackbar = useSnackbarStore();
      return snackbar.show;
    },

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
      try {
        const response = await api.getUserImages(page);
        this.userImages = response.data;
        this.currentPage = page;
      } catch {
        this.snackbar("Error getting  images", "error");
      }
    },

    async getImagesCount() {
      try {
        const response = await api.getImagesCount();
        this.imagesCount = response.data;
      } catch {
        this.snackbar("Error getting images", "error");
      }
    },

    async togleFavouriteImage(id: string) {
      try {
        await api.togleFavouriteImage(id);
        this.getAllFav();
        this.snackbar("Image added to fav", "success");
      } catch {
        this.snackbar("Error while adding image to fav", "error");
      }
    },

    async getAllFav() {
      try {
        const userFavImages = [];
        for (let i = 0; ; i++) {
          const response = await api.getFavroites(i);

          if (response.data.length === 0) break;

          userFavImages.push(...response.data);
        }
        this.userFavImages = userFavImages;
      } catch {
        this.snackbar("Error getting favorites images", "error");
      }
    },

    async postImage(image: string) {
      try {
        await api.postImage(image);
        this.getUserImages();
        this.snackbar("Image added", "success");
      } catch {
        this.snackbar("Error while adding image", "error");
      }
    },

    async deleteImage(id: string) {
      try {
        await api.deleteImage(id);
        this.getUserImages(this.currentPage);
        this.snackbar("Image deleted", "success");
      } catch {
        this.snackbar("Error while deleting image", "error");
      }
    },
  },
});
