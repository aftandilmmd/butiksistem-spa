import { useCartStore } from 'src/stores/terminal/cart-store';
import { CartItemInterface, CartInterface, CustomerInterface, AddressInterface, CartTaxRateInterface, CartTransactionInterface } from 'src/core/types/model.d';
import { sum } from 'lodash';
import CartItem from '../models/CartItem';
import CartModel from '../models/CartModel';

export function useCart(store: CartInterface = useCartStore()){

  function getCurrentCart() {
    return {
      items: getItems(),
      customer: getCustomer(),
      shipping_address: getShippingAddress(),
      billing_address: getBillingAddress(),
      transactions: getTransactions(),
      discount: store.discount
    }
  }

  function setCurrentCart(cart: CartInterface) {
    return {
      items: cart.items,
      customer: cart.customer,
      shipping_address: cart.shipping_address,
      billing_address: cart.billing_address,
      transactions: cart.transactions,
    }
  }

  function item(item: CartItemInterface) {
    return CartItem(item);
  }

  function addItem(item: CartItemInterface): void {
    store.items.push(item)
  }

  function removeItem(id: number): void {
      store.items = store.items.filter( item => item.id !== id)
  }

  function updateItem(id: number, item: CartItemInterface): void {
      const item_index = store.items.findIndex( item => item.id === id)
      store.items[item_index] = item;
  }

  function getItemById(id: number): CartItemInterface | undefined {
    return store.items.find( item => item.id === id);
  }

  function getItems(): CartItemInterface[] {
    return store.items;
  }

  function setItems(items: CartItemInterface[]): void {
    store.items = items;
  }

  function clearItems(): void {
    store.items = [];
  }

  // Customer Setter & Getter
  function setCustomer(customer: CustomerInterface): void {
    store.customer = customer;
  }

  function getCustomer(): CustomerInterface {
    return store.customer
  }

  // Address Setter & Getters
  function setShippingAddress(address: AddressInterface): void {
    store.shipping_address = address
  }

  function getShippingAddress(): AddressInterface {
    return store.shipping_address;
  }

  function setBillingAddress(address: AddressInterface): void {
    store.billing_address = address;
  }

  function getBillingAddress(): AddressInterface {
    return store.billing_address;
  }

  function addTransaction(transaction: CartTransactionInterface): void {
    store.transactions.push(transaction);
  }

  function cancelTransaction(hash_id: string): void {
    store.transactions = store.transactions.filter((transaction: CartTransactionInterface) => transaction.hash_id != hash_id);
  }

  function getTransactions(): CartTransactionInterface[] {
    return store.transactions;
  }

  function getTotalPrice(): number {
    return sum(store.items.map(item => CartItem(item).getTotalPrice()));
  }

  function getTaxPrices(): CartTaxRateInterface[] {
    return CartModel(store.items).getTaxPrices();
  }

  function createOrder() {
    // TODO send ajax request and create order
  }

  return {
    item,
    addItem,
    removeItem,
    updateItem,
    getItemById,

    getItems,
    setItems,

    setCustomer,
    getCustomer,

    setShippingAddress,
    getShippingAddress,

    setBillingAddress,
    getBillingAddress,

    getTransactions,
    addTransaction,
    cancelTransaction,

    getTotalPrice,
    createOrder,
    clearItems,
    getTaxPrices,
    getCurrentCart,
    setCurrentCart,
  }

}
