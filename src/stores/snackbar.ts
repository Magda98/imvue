import { defineStore, type _GettersTree } from "pinia";

interface Data {
  showSnackbar: boolean;
  message: string;
  timeout: number;
  status: string;
}

export const useSnackbarStore = defineStore<string, Data, _GettersTree<Data>>({
  id: "snackbar",
  state: () => ({
    showSnackbar: true,
    message: "message",
    timeout: 5000,
    status: "success",
  }),

  actions: {
    close() {
      this.showSnackbar = false;
    },

    show(message: string, status: string) {
      this.message = message;
      this.showSnackbar = true;
      this.status = status;
      setTimeout(this.close, this.timeout);
    },
  },
});
