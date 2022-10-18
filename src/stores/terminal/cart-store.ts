import { defineStore } from 'pinia';
import { sum } from 'lodash';
import { useStorage } from '@vueuse/core';

import {
  ifItemExistsInCart,
  incrementCartItemQuantity,
  getCartTotalVariantsCount,
  resetCartItemVariantDiscount,
  filterCartByItemHashId,
  getCartTotalPrice,
  removeCartItemDiscount,
  groupCartItemsByTaxRate,
} from 'src/resources/Cart';

import { calculateTax } from 'src/utils/Money'

export const useCartStore = defineStore('cartStore', {

  state: () => ({
    items: useStorage('cart',[]) ,
    customer: {
      first_name:'',
      last_name :'',
      phone :'',
      email :'',
      delivery_address: {
        city      :'',
        district  :'',
        address   :'',
      },
      meta : {}
    },
    transactions: [],
  }),

  getters: {

    getCustomer(state){
      return state.customer
    },

    getCustomerFullName(state){
      const first_name = state?.customer?.first_name;
      const last_name  = state?.customer?.last_name;

      if(!first_name && !last_name){
        return null;
      }

      return first_name + ' ' + last_name

    },

    parkState: (state) => ({
      items: state.items,
      customer: state.customer,
    }),

    has_items: (state) => state.items.length > 0,

    has_customer: (state) => state.customer.first_name && state.customer.last_name,

    total_items_count: (state) => state.items.length,

    total_variants_count (state){
      return getCartTotalVariantsCount(state.items);
    },

    total_price: (state) => {
      return getCartTotalPrice(state.items);
    },

    transactions_total(state) {
      return sum(state.transactions.map((t) => t.amount));
    },

    remaining_payment_amount() {
      return this.priceTotal < 0 ? 0 : this.priceTotal - this.transactions_total;
    },

    calculated_taxes(state){

      const grouped_items = groupCartItemsByTaxRate(state.items);

      const response = [];

      for (const tax_rate of Object.keys(grouped_items)) {
        const tax_items      = grouped_items[tax_rate];
        const total_price    = getCartTotalPrice(tax_items);

        response.push( calculateTax(total_price, tax_rate) )
      }

      return response;

    },

  },

  actions: {

    setCustomer(customer = {}) {
      this.customer = customer;
    },

    async addItem(item) {

      try{

        const item_index = await ifItemExistsInCart(this.items, item);

        incrementCartItemQuantity( this.items[item_index] );

      }catch (e){

        resetCartItemVariantDiscount(item);

        this.items.push(item);

      }

    },

    removeItem(hash_id) {
      this.items = filterCartByItemHashId(this.items, hash_id);
    },

    async updateItem(item) {

      try{

        const index = await ifItemExistsInCart(this.items, item);
        this.items[index] = item;

      }catch (e){}

    },

    async removeDiscountFromItem(item) {

      try{

        const index = await ifItemExistsInCart(this.items, item);

        removeCartItemDiscount(this.items[index]);

      }catch (e){}

    },

    resetCart() {
      this.items = [];
      this.transactions = [];
      this.setCustomer({});
    },

    addTransaction(transaction) {
      this.transactions.push(transaction);
    },

    cancelTransaction(hash_id) {
      this.transactions = this.transactions.filter((t) => t.hash_id != hash_id);
    },

    restoreCart(cart) {
      this.items = cart.items;
      this.customer = cart.customer;
    },
  },

});
