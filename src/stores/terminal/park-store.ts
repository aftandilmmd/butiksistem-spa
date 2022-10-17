import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useStorage } from "@vueuse/core";
import { useCartStore } from "src/stores/terminal/cart-store";

const cartStore = useCartStore();

export const useParkStore = defineStore("parkStore", {
  state: () => ({
    parks: useStorage("parks", []),
  }),

  getters: {},

  actions: {
    addPark(park) {
      this.parks = [park, ...this.parks];
    },

    removePark(hash_id) {
      this.parks = this.parks.filter((park) => park.hash_id != hash_id);
    },

    restorePark(park) {
      cartStore.restoreCart(park.cart);
    },
  },
});
