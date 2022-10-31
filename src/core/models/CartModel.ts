import { CartItemInterface, CartTaxRateInterface } from '../types/model';
import Product from './Product';
import { Dictionary, groupBy, NumericDictionary, sum } from 'lodash';
import CartItem from './CartItem';
import { calculateTax } from 'src/utils/Money';

function CartModel(items: CartItemInterface[]){

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
      const total_price = CartModel(tax_items).getUpdatedTotalPrice();
      response.push(calculateTax(total_price, Number(tax_rate)))

    });

    return response;
  }

  function getVariantsCount() {
    return items.reduce((total, item) => (total += CartItem(item).getQuantity()), 0)
  }

  function exists(item: CartItemInterface){
    return items.findIndex((cart_item: CartItemInterface) => {
      return CartItem(cart_item).getHash() === CartItem(item).getHash() || CartItem(cart_item).getId() === CartItem(item).getId()
    }) > -1;
  }

  function incQuantityIfExists(item: CartItemInterface){

    if( exists(item) ){

      const variant = CartItem(item).getVariant();

      variant.attributes.quantity = CartItem(item).getQuantity() + 1;

      item = CartItem(item).setVariant(variant);

    }

  }

  return {
    getTotalPrice,
    getUpdatedTotalPrice,
    getTaxPrices,
    groupItemsByTaxRate,
    getVariantsCount,
    exists,
    incQuantityIfExists
  }

}

export default CartModel;
