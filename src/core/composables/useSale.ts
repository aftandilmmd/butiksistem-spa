import { useSaleStore } from 'src/stores/terminal/sale-store';
import SaleItem from '../models/SaleItem';
import { SaleItemType } from 'src/core/types/sale-types';
import { PaginationMetaType } from '../types/model';
import { api } from 'src/boot/axios';

export function useSale(store = useSaleStore()){

  function item(item: SaleItemType) {
    return SaleItem(item);
  }

  async function getSalesFromServer(page: number, per_page: number): Promise<void> {
    return await store.getSalesFromServer(page, per_page);
  }

  function getSales(): SaleItemType[] {
    return store.sales.data;
  }

  function getCurrentSale(): SaleItemType {
    return store.current_sale;
  }

  function getTotalSalesCount(): number {
    return store.sales.meta.total;
  }

  function getSalesMeta(): PaginationMetaType {
    return store.sales.meta;
  }

  function getLastPage(): number {
    return store.sales.meta.last_page;
  }

  function getSaleById(id: string): SaleItemType | undefined {
    return getSales().find( (sale: SaleItemType) => sale.id === id);
  }

  async function getSaleFromServer(id: string) {
    const response = await api.get(`/api/v1/terminal/sales/${id}`);
    store.current_sale = response.data.data;
  }

  return {
    item,
    getSales,
    getCurrentSale,
    getSaleById,
    getSalesFromServer,
    getTotalSalesCount,
    getSalesMeta,
    getSaleFromServer,
    getLastPage,
  }

}
