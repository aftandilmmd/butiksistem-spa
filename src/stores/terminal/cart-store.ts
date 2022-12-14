import { ProductInterface } from 'src/core/types/model';
import { PricingType, CartTaxRateInterface, AddressInterface, CustomerInterface, CartStateInterface, CartTransactionInterface, } from 'src/core/types/cart-types';
import { defineStore } from 'pinia';
import { sumBy } from 'lodash';
import CartModel from 'src/core/models/CartModel';

import {
  ifItemExistsInCart,
  filterCartByItemHashId,
  removeCartItemDiscount,
} from 'src/resources/Cart';

export const useCartStore = defineStore('cartStore', {

  state(): CartStateInterface {
    return {
      items: [],
      customer: <CustomerInterface>{},
      shipping_address: <AddressInterface>{},
      billing_address: <AddressInterface>{},
      transactions: <CartTransactionInterface[]>[],
      discount: <PricingType>{},
    }
  },

  getters: {

    getItems(state) {
      return state.items
    },

    getCustomer(state) {
      return state.customer
    },

    getShippingAddress(state) {
      return state.shipping_address
    },

    getBillingAddress(state) {
      return state.billing_address
    },

    getCustomerFullName(state): string {
      const first_name = state?.customer?.first_name;
      const last_name = state?.customer?.last_name;

      if (!first_name || !last_name) {
        return '';
      }

      return first_name + ' ' + last_name

    },

    hasItems: (state): boolean => state.items.length > 0,

    getItemsCount: (state): number => state.items.length,

    getTotalPrice: (state): number => {
      // return CartModel(state.items).getTotalPrice();
      return CartModel(state.items).getUpdatedTotalPrice();
    },

    getUpdatedTotalPrice: (state): number => {
      return CartModel(state.items).getUpdatedTotalPrice();
    },

    getTransactionsTotalAmount(state): number {
      return state.transactions.length === 0 ? 0 : sumBy(state.transactions, 'amount')
    },

    getTransactionsRemainingAmount(): number {
      return this.getTotalPrice < 0 ? 0 : this.getTotalPrice - this.getTransactionsTotalAmount;
    },

    getTaxPrices(state): CartTaxRateInterface[] {
      return CartModel(state.items).getTaxPrices();
    },

  },

  actions: {

    add(item: ProductInterface): void {

      if( CartModel(this.items).exists(item) ) {
        CartModel(this.items).incQuantityIfExists(item)
      }else{
        this.items.push( item );
      }

    },

    remove(hash_id: string): void {
      this.items = filterCartByItemHashId(this.items, hash_id);
    },

    update(item: ProductInterface): void {

      try {
        const index = ifItemExistsInCart(this.items, item);
        this.items[index] = item;
      } catch (e) { }

    },

    reset(): void {
      this.items = <ProductInterface[]>[];
      this.transactions = <CartTransactionInterface[]>[];
      this.customer = <CustomerInterface>{}
      this.shipping_address = <AddressInterface>{}
      this.billing_address = <AddressInterface>{}
    },

    restore(cart: CartStateInterface) {
      this.items = cart.items;
      this.customer = cart.customer;
    },

    setCustomer(customer: CustomerInterface): void {
      this.customer = customer;
    },

    removeItemDiscount(item: ProductInterface) {

      try {
        const index = ifItemExistsInCart(this.items, item);
        removeCartItemDiscount(this.items[index]);
      } catch (e) { }

    },

    removeCartDiscount(item: ProductInterface) {

      try {
        const index = ifItemExistsInCart(this.items, item);
        removeCartItemDiscount(this.items[index]);
      } catch (e) { }

    },

    addTransaction(transaction: CartTransactionInterface): void {
      this.transactions.push(transaction);
    },

    cancelTransaction(hash_id: string): void {
      this.transactions = this.transactions.filter((transaction: CartTransactionInterface) => transaction.hash_id != hash_id);
    },

    setShippingAddress(address: AddressInterface): void {
      this.shipping_address = address;
    },

    setBillingAddress(address: AddressInterface): void {
      this.billing_address = address;
    },

  },

});
