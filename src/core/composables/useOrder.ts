import { useOrderStore } from 'src/stores/terminal/order-store';
import OrderItem from '../models/OrderItem';
import { OrderItemType } from 'src/core/types/order-types';
import { PaginationMetaType } from '../types/model';
import { api } from 'src/boot/axios';

export function useOrder(store = useOrderStore()){

  function item(item: OrderItemType) {
    return OrderItem(item);
  }

  async function getOrdersFromServer(page: number, per_page: number): Promise<void> {
    return await store.getOrdersFromServer(page, per_page);
  }

  function getOrders(): OrderItemType[] {
    return store.orders.data;
  }

  function getCurrentOrder(): OrderItemType {
    return store.current_order;
  }

  function getTotalOrdersCount(): number {
    return store.orders.meta.total;
  }

  function getOrdersMeta(): PaginationMetaType {
    return store.orders.meta;
  }

  function getLastPage(): number {
    return store.orders.meta.last_page;
  }

  function getOrderById(id: string): OrderItemType | undefined {
    return getOrders().find( (order: OrderItemType) => order.id === id);
  }

  async function getOrderFromServer(id: string) {
    const response = await api.get(`/api/v1/terminal/orders/${id}`);
    store.current_order = response.data.data;
  }

  return {
    item,
    getOrders,
    getCurrentOrder,
    getOrderById,
    getOrdersFromServer,
    getTotalOrdersCount,
    getOrdersMeta,
    getOrderFromServer,
    getLastPage,
  }

}
