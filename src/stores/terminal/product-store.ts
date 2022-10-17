import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useStorage } from "@vueuse/core";
import { getProductCategories } from "src/resources/Product";
import { uniqBy } from 'lodash';

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] ,
    favorites: useStorage("favorites", []),
  }),

  getters: {

    isFavorited: (state) => (product_id) => state.favorites.findIndex((item) => item?.id == product_id) != -1,

    formattedProducts: (state) => state.products,

    unique_categories: (state) => {

      let categories = [];

      state.products.forEach( product => {
        let product_categories = getProductCategories(product);
        if( product_categories.length > 0){
          categories.push(...product_categories)
        }
      });

      return uniqBy(categories, 'id');

    },

  },

  actions: {
    async getProducts() {
      let response = await api.get('/api/products');
      this.products = response.data.data;
    },

    favorite(product) {
      this.favorites.push(product);
    },

    unfavorite(product_id) {
      this.favorites = this.favorites.filter((item) => item?.id != product_id);
    },
  },
});
