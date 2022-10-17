import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useStorage } from "@vueuse/core";
import { useCartStore } from "src/stores/terminal/cart-store";

const cartStore = useCartStore();

export const useHistoryStore = defineStore("historyStore", {
  state: () => ({
    rows: () =>
      Array.from({ length: 1000 }).map(() => ({
        token: 1004,
        customer_name: "Mahire Çalım",
        date: "22 Haziran 2022 - 16:26",
        payment_type: "Nakit",
        status: "Satış",
        total_price: 1125,
        staff_name: "John Doe",
      })),
  }),

  getters: {},

  actions: {
    getHistory() {
      // this.rows = [];
    },
  },
});
