import { defineStore, type _GettersTree } from "pinia";

interface Data {
  showModal: boolean;
}

export const useModalStore = defineStore<string, Data, _GettersTree<Data>>({
  id: "modal",
  state: () => ({
    showModal: false,
  }),

  actions: {},
});
