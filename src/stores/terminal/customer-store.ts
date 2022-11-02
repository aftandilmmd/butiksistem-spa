import { useStorage } from '@vueuse/core';
import { CustomerInterface } from 'src/core/types/cart-types';
import { defineStore } from 'pinia';

export const useCustomerStore = defineStore('customerStore', {

  state: () => ({
    customers: useStorage<CustomerInterface[]>('customers', [])
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
