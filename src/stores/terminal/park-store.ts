import { ParkItemInterface } from './../../core/types/model.d';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { useCartStore } from 'src/stores/terminal/cart-store';

const cartStore = useCartStore();

export const useParkStore = defineStore('parkStore', {
  state: () => ({
    parks: useStorage<ParkItemInterface[]>('parks', []),
  }),

  getters: {},

  actions: {
    addPark(park: ParkItemInterface) {
      this.parks = [park, ...this.parks];
    },

    removePark(hash_id: string) {
      this.parks = this.parks.filter((park: ParkItemInterface) => park.id != hash_id);
    },

    restorePark(park) {
      cartStore.restore(park.cart);
    },
  },
});
