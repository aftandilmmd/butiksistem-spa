import { PaginationMetaType } from 'src/core/types/model.d';
import { SaleItemType } from 'src/core/types/sale-types.d';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';


export const useSaleStore = defineStore('saleStore', {

  state() {
    return {
      sales: {
        data: <SaleItemType[]>[],
        links: {},
        meta: <PaginationMetaType>{}
      },

      current_sale: <SaleItemType>{}
    }
  },

  getters: {},

  actions: {
    async getSalesFromServer(page = 1, per_page = 5): Promise<void> {
      const response = await api.get(`/api/v1/terminal/sales?page=${page}&per_page=${per_page}`);
      this.sales = response.data;
    },
  },

});
