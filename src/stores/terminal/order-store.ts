import { PaginationMetaType } from 'src/core/types/model.d';
import { OrderItemType } from 'src/core/types/order-types.d';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';


export const useOrderStore = defineStore('orderStore', {

  state() {
    return {
      orders: {
        data: <OrderItemType[]>[],
        links: {},
        meta: <PaginationMetaType>{}
      },

      current_order: <OrderItemType>{}
    }
  },

  getters: {},

  actions: {
    async getOrdersFromServer(page = 1, per_page = 5): Promise<void> {
      const response = await api.get(`/api/v1/terminal/orders?page=${page}&per_page=${per_page}`);
      this.orders = response.data;
    },
  },

});
