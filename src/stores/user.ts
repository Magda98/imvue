import { defineStore, type _GettersTree } from "pinia";
import api from "../api";
import { apiClient } from "../api";

interface Data {
  token: string | null;
  username: string | null;
  userInfo:
    | {
        avatar: string;
        cover: string;
        id: number;
        reputation: number;
        url: string;
      }
    | undefined;
}

export const useUserStore = defineStore<string, Data, _GettersTree<Data>>({
  id: "user",
  state: () => ({
    token: "",
    username: "",
    userInfo: undefined,
  }),

  actions: {
    getAccessTokenUrl() {
      const client_id = "60895d90e965e97";
      const url = `https://api.imgur.com/oauth2/authorize?client_id=${client_id}&response_type=token`;
      window.location.href = url;
    },

    getAccessToken() {
      const url = window.location.hash.substring(1);
      const access_token = new URLSearchParams(url).get("access_token");
      const account_username = new URLSearchParams(url).get("account_username");
      this.token = access_token;
      this.username = account_username;

      apiClient.defaults.headers.common = {
        Authorization: `Bearer ${access_token}`,
      };

      this.getUserData();
    },

    async setAccessToken() {
      apiClient.defaults.headers.common = {
        Authorization: `Bearer ${this.token}`,
      };
    },

    async getUserData() {
      const response = await api.getUserData(this.username);
      this.userInfo = response.data;
      window.location.hash = "";
      window.location.reload();
    },

    async getUserImages() {
      const response = await api.getUserImages();
      this.userImages = response.data;
    },

    logout() {
      this.userInfo = undefined;
      this.token = "";
    },
  },
  persist: true,
});
