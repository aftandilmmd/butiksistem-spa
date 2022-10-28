import { CartItemInterface, CartTaxRateInterface } from '../types/model.d';
import Product from './Product';
import { Dictionary, groupBy, NumericDictionary, sum } from 'lodash';
import CartItem from './CartItem';
import { calculateTax } from 'src/utils/Money';

function Cart(items: CartItemInterface[]){

  function groupItemsByTaxRate(): Dictionary<CartItemInterface[]> {
    return groupBy(items, item => Product(item).getTaxRate())
  }

  function getTotalPrice(): number {
    return sum(items.map(item => CartItem(item).getTotalPrice()));
  }

  function getUpdatedTotalPrice(): number {
    return sum(items.map(item => CartItem(item).getUpdatedTotalPrice()));
  }

  function getTaxPrices(): CartTaxRateInterface[] {

    const grouped_items: NumericDictionary<CartItemInterface[]> = groupItemsByTaxRate()

    const response: CartTaxRateInterface[] = [];

    Object.keys(grouped_items).forEach(tax_rate => {

      const tax_items = grouped_items[Number(tax_rate)];
      const total_price = Cart(tax_items).getUpdatedTotalPrice();
      response.push(calculateTax(total_price, Number(tax_rate)))

    });

    return response;
  }

  function getVariantsCount() {
    return items.reduce((total, item) => (total += CartItem(item).getQuantity()), 0)
  }

  return {
    getTotalPrice,
    getUpdatedTotalPrice,
    getTaxPrices,
    groupItemsByTaxRate,
    getVariantsCount,
  }

}

export default Cart;
