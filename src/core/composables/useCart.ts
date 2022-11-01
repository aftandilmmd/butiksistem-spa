import { CartStateInterface, CustomerInterface, AddressInterface, CartTaxRateInterface, CartTransactionInterface, ProductInterface, VariantInterface, ParkItemInterface } from 'src/core/types/model.d';
import { CartItemType } from 'src/core/types/cart-type.d';

import { groupBy, NumericDictionary, sum } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { calculateTax } from 'src/utils/Money';
import { useParkStore } from 'src/stores/terminal/park-store';
import { useCartStore } from 'src/stores/terminal/cart-store';
import CartItem from '../models/CartItem';
import Product from '../models/Product';
import Variant from '../models/Variant';
import { usePark } from './usePark';

export function useCart(store: CartStateInterface = useCartStore()){

  const ParkManager = usePark(useParkStore( ));

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

  function setCurrentCart(cart: CartStateInterface) {
    return {
      items: cart.items,
      customer: cart.customer,
      shipping_address: cart.shipping_address,
      billing_address: cart.billing_address,
      transactions: cart.transactions,
    }
  }

  function parkCurrentCart(title = ''): ParkItemInterface {
    return ParkManager.addPark(title, getCurrentCart());
  }

  function item(item: CartItemType) {
    return CartItem(item);
  }

  function addItem(product: ProductInterface, variant: VariantInterface, quantity = 1): void {

    const cart_item = getItemByVariant(variant)

    if(cart_item){
      incItemQuantity(cart_item)
      return;
    }

    const item: CartItemType = {
      type: 'cart_items',
      id: uuidv4(),
      attributes: {
        quantity: quantity,
        product: {
          id: Product(product).getId(),
          name: Product(product).getName(),
          price: Product(product).getPrice(),
          tax_rate: Product(product).getTaxRate(),
        },
        variant: {
          id: Variant(variant).getId(),
          name: Variant(variant).getName(),
          price: Variant(variant).getPrice( Product(product).getPrice() ),
        }
      },
      meta: {
        pricing:{
            pricing_type: 'discount',
            discount_type: 'percent',
            amount: null
        },
        note: ''
      }
    }

    store.items.push( item )
  }

  function removeItem(id: string): void {
      store.items = store.items.filter( item => item.id !== id)
  }

  function updateItem(id: string, item: CartItemType): void {
      const item_index = store.items.findIndex( item => item.id === id)
      store.items[item_index] = item;
  }

  function incItemQuantity(item: CartItemType, add_quantity = 1): void {
    item.attributes.quantity = item.attributes.quantity + add_quantity;
    store.items[getItemIndexById(item.id)] = item;
  }

  function getItemById(id: string): CartItemType | undefined {
    return store.items.find( item => item.id === id);
  }

  function getItems(): CartItemType[] {
    return store.items;
  }

  function setItems(items: CartItemType[]): void {
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
    const grouped_items: NumericDictionary<CartItemType[]> = groupBy(store.items, item => CartItem(item).getTaxRate())

      const response: CartTaxRateInterface[] = [];

      Object.keys(grouped_items).forEach(tax_rate => {

        const tax_items = grouped_items[Number(tax_rate)];
        const total_price = sum(tax_items.map(item => CartItem(item).getUpdatedTotalPrice()));
        response.push(calculateTax(total_price, Number(tax_rate)))

      });

      return response;
  }

  function getItemIndexById(id: string): number{
    return store.items.findIndex((cart_item: CartItemType) => CartItem(cart_item).getId() === id);
  }

  function getItemIndexByVariant(variant: VariantInterface): number{
    const variant_id = Variant(variant).getId();
    return store.items.findIndex((cart_item: CartItemType) => CartItem(cart_item).getVariant().id === variant_id);
  }

  function getItemByVariant(variant: VariantInterface): CartItemType | undefined{
    const item_index = getItemIndexByVariant(variant);
    return store.items[item_index]
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
    parkCurrentCart,
    getItemIndexById,
    getItemIndexByVariant,
    getItemByVariant,
    incItemQuantity,
  }

}
