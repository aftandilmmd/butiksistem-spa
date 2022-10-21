import { CustomerInterface } from 'src/core/types/model.d';
import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customerStore', {

  state: () => ({
    customers: <CustomerInterface[]>[]
  }),

  getters: {

    getCustomers(state){
      return state.customers;
    }

  },

  actions: {

    addCustomer(customer: CustomerInterface) {
      this.customers.push(customer);
    },

  },
});
