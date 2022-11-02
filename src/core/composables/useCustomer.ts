import { CustomerInterface } from 'src/core/types/cart-types';
import { useCustomerStore } from 'src/stores/terminal/customer-store';

export function useCustomer(store = useCustomerStore()){

  function addCustomer(customer: CustomerInterface): void {
    store.customers.push(customer);
  }

  function getCustomers(): CustomerInterface[] {
    return store.customers;
  }

  return {
    addCustomer,
    getCustomers,
  }

}
