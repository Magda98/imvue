import { defineStore } from "pinia";
import api from "../api";
import { apiClient } from "../api";

interface Data {
  token: string | null;
  username: string | null;
}

export const useUserStore = defineStore({
  id: "user",
  state: () =>
    ({
      token: "",
      username: "",
    } as Data),
  getters: {},
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

    setAccessToken() {
      apiClient.defaults.headers.common = {
        Authorization: `Bearer ${this.token}`,
      };
    },

    async getUserData() {
      const response = await api.getUserData(this.username);
      console.log(response);
    },
  },
});
