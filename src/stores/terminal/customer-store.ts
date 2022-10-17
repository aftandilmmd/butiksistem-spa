import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCustomerStore = defineStore("customerStore", {

  state: () => ({
    customers: []
  }),

  getters: {
    get_customers(state){
      return state.customers;
    }
  },

  actions: {

    addCustomer(customer = {}) {
      this.customers.push(customer);
    },

  },
});
