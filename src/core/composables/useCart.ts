import { CartItemInterface, CartInterface, CustomerInterface, AddressInterface } from 'src/core/types/model.d';

export function useCart(store: CartInterface){

  function addItem(item: CartItemInterface) {
    store.items.push(item)
  }

  function removeItem(id: number): void {
      store.items = store.items.filter( item => item.id !== id)
  }

  function updateItem(id: number, item: CartItemInterface) {
      const item_index = store.items.findIndex( item => item.id === id)
      store.items[item_index] = item;
  }

  function getCartItems(): CartItemInterface[] {
    return store.items;
  }

  function setCartItems(items: CartItemInterface[]) {
    return store.items = items;
  }

  function clearCartItems() {
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

  function getTotalPrice(): number {
    return store.items.reduce((total, item) => (total + item.price), 0)
  }

  function createOrder() {
    // TODO send ajax request and create order
  }

  return {
    addItem,
    removeItem,
    updateItem,

    getCartItems,
    setCartItems,

    setCustomer,
    getCustomer,

    setShippingAddress,
    getShippingAddress,

    setBillingAddress,
    getBillingAddress,

    getTotalPrice,
    createOrder,
    clearCartItems
  }

}
