import { ProductInterface, CategoryInterface } from 'src/core/types/model.d';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useStorage } from '@vueuse/core';
import { getProductCategories } from 'src/resources/Product';
import { uniqBy } from 'lodash';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: useStorage<ProductInterface[]>('products', []),
    favorites: useStorage<ProductInterface[]>('favorites', []),
  }),

  getters: {

    isFavorited(state) {
      return (product_id: number) => state.favorites.findIndex((item: ProductInterface) => item?.id == product_id) != -1
    },

    formattedProducts: (state) => state.products,

    unique_categories: (state) => {

      const categories: CategoryInterface[] = [];

      state.products.forEach(product => {

        const product_categories: CategoryInterface[] = getProductCategories(product);

        (product_categories.length > 0) && categories.push(...product_categories)

      });

      return uniqBy(categories, 'id');

    },

  },

  actions: {
    async getProducts(): Promise<void> {
      const response = await api.get('/api/products');
      this.products = response.data.data;
    },

    favorite(product: ProductInterface): void {
      this.favorites.push(product);
    },

    unfavorite(product_id: number): void {
      this.favorites = this.favorites.filter((item: ProductInterface) => item?.id != product_id);
    },
  },
});
