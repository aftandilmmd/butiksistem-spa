import { VariantInterface, CartItemInterface, DiscountType } from 'src/core/types/model.d';
import { v4 as uuidv4 } from 'uuid';
import { sum, groupBy } from 'lodash';

import {
  getProductFirstVariant,
  getProductPrice,
  getProductTaxRate,
  getVariantId,
  getVariantMetaAmount,
  getVariantMetaDiscountType,
  getVariantMetaTransactionType,
  getVariantPrice,
  getVariantQuantity
} from 'src/resources/Product';

// Variant Attribute Getters
function getCartItemVariantName(cart_item: CartItemInterface) {
  return getProductFirstVariant(cart_item)?.attributes?.name;
}

function getCartItemVariantPrice(cart_item: CartItemInterface) {
  return getProductFirstVariant(cart_item)?.attributes?.price;
}

function getCartItemVariantQuantity(cart_item: CartItemInterface) {
  return getProductFirstVariant(cart_item)?.attributes?.quantity;
}

function getCartItemVariantNote(cart_item: CartItemInterface) {
  return getProductFirstVariant(cart_item)?.meta?.note;
}

function getCartItemVariantStockCode(cart_item: CartItemInterface): number | undefined {
  return getProductFirstVariant(cart_item)?.attributes?.barcode;
}


// Variant Attribute Setters
function setCartItemVariantMeta(cart_item: CartItemInterface): CartItemInterface {

  const variant: VariantInterface = getProductFirstVariant(cart_item);

  variant.meta = {
    hash_id: uuidv4(),
    transaction_type: 'discount',
    discount_type: 'percent',
    amount: null,
  }

  return cart_item;

}

function resetCartItemVariantDiscount(cart_item: CartItemInterface): CartItemInterface {

  setCartItemVariantMeta(cart_item);

  return cart_item;

}

function removeCartItemDiscount(cart_item: CartItemInterface): CartItemInterface {

  setCartItemVariantMeta(cart_item);

  return cart_item;

}

function setCartItemVariant(cart_item: CartItemInterface, variant: VariantInterface): CartItemInterface {
  cart_item.relations.variants[0] = variant
  return cart_item;
}

function setCartItemVariantQuantity(variant: VariantInterface, quantity: number): VariantInterface {
  variant.attributes.quantity = quantity;
  return variant;
}

function incrementCartItemQuantity(cart_item: CartItemInterface, quantity = 1): CartItemInterface {

  incrementCartItemVariantQuantity(
    getProductFirstVariant(cart_item),
    quantity
  );

  return cart_item;

}

function incrementCartItemVariantQuantity(variant: VariantInterface, quantity = 1): VariantInterface {

  const old_quantity = getVariantQuantity(variant);

  const new_quantity = old_quantity + quantity;

  setCartItemVariantQuantity(variant, new_quantity);

  return variant;

}

function filterCartByItemHashId(cart_items: CartItemInterface[], cart_item_hash_id: string): CartItemInterface[] {

  return cart_items.filter(item => getCartItemVariantMetaHashId(item) !== cart_item_hash_id)

}


// Variant Meta
function getCartItemVariantMetaTransactionType(item: CartItemInterface) {
  return getProductFirstVariant(item)?.meta?.transaction_type;
}

function getCartItemVariantMetaDiscountType(item: CartItemInterface): DiscountType {
  return getProductFirstVariant(item)?.meta?.discount_type;
}

function getCartItemVariantMetaAmount(item: CartItemInterface): number {
  return getProductFirstVariant(item)?.meta?.amount;
}

function getCartItemVariantMetaHashId(item: CartItemInterface) {
  return getProductFirstVariant(item)?.meta?.hash_id;
}

function getCartItemPrice(item: CartItemInterface): number {
  return item?.attributes?.price;
}

function getCartItemCalculatedPrice(item: CartItemInterface) {
  const transaction_type = getCartItemVariantMetaTransactionType(item);
  const discountType = getCartItemVariantMetaDiscountType(item);
  const amount = getCartItemVariantMetaAmount(item);
  const price = getProductFirstVariant(item) ? getCartItemVariantPrice(item) : getCartItemPrice(item);

  if (transaction_type === 'custom') {
    return amount;
  }

  if (transaction_type === 'discount') {

    if (discountType === 'percent') {
      return price - (price * amount) / 100;
    }

    if (discountType === 'fixed') {
      return price - amount;
    }

  }

  return price;
}

function isCartItemPriceUpdated(item: CartItemInterface): boolean {
  return getCartItemCalculatedPrice(item) !== getCartItemVariantPrice(item)
}

function getCartItemTotalPrice(item: CartItemInterface): number {
  return getCartItemVariantQuantity(item) * getCartItemPrice(item)
}

function getCartItemUpdatedTotalPrice(item: CartItemInterface): number {
  return getCartItemVariantQuantity(item) * getCartItemCalculatedPrice(item)
}

function ifItemExistsInCart(items: CartItemInterface[], item: CartItemInterface): number {

  const variant_id: number = getVariantId(getProductFirstVariant(item));

  return items.findIndex((cart_item: CartItemInterface) => getVariantId(getProductFirstVariant(cart_item)) === variant_id);

}

function isCartItemVariantOverDiscounted(cart_item: CartItemInterface, variant: VariantInterface): boolean {

  // If new price is negative
  if (getVariantMetaTransactionType(variant) === 'custom') {
    return getVariantMetaAmount(variant) < 0;
  }

  // If given percentage is greater than 100%
  if (getVariantMetaDiscountType(variant) === 'percent' && getVariantMetaAmount(variant) > 100) {
    return true;
  }

  // If given given fixed price is greater than variant price
  if (
    getVariantMetaDiscountType(variant) == 'fixed' &&
    getVariantMetaAmount(variant) > getVariantPrice(variant, getProductPrice(cart_item))
  ) {
    return true;
  }

  return false;
}

function getCartTotalPrice(items: CartItemInterface[]) {
  return sum(items.map(item => getCartItemUpdatedTotalPrice(item)));
}

function getCartTotalVariantsCount(items: CartItemInterface[]) {
  return items.reduce((total, item) => (total += getCartItemVariantQuantity(item)), 0)
}

function filterCartItemsByTaxRate(items: CartItemInterface[], tax_rate = 18) {
  return items.filter(item => item?.attributes?.tax_rate === tax_rate)
}

function groupCartItemsByTaxRate(items: CartItemInterface[]) {
  return groupBy(items, item => getProductTaxRate(item))
}

export {

  // Cart Getters
  getCartTotalPrice,
  getCartTotalVariantsCount,

  // Cart Item Getter
  getCartItemTotalPrice,
  getCartItemUpdatedTotalPrice,
  getCartItemPrice,
  getCartItemCalculatedPrice,

  // Variant Getters
  getCartItemVariantMetaHashId,
  getCartItemVariantQuantity,
  getCartItemVariantMetaTransactionType,
  getCartItemVariantMetaDiscountType,
  getCartItemVariantMetaAmount,
  getCartItemVariantName,
  getCartItemVariantNote,
  getCartItemVariantStockCode,
  getCartItemVariantPrice,

  // Variant Setters
  setCartItemVariantMeta,
  setCartItemVariant,
  setCartItemVariantQuantity,
  incrementCartItemQuantity,
  incrementCartItemVariantQuantity,
  removeCartItemDiscount,
  resetCartItemVariantDiscount,

  // Others
  isCartItemVariantOverDiscounted,
  isCartItemPriceUpdated,
  filterCartByItemHashId,
  ifItemExistsInCart,
  filterCartItemsByTaxRate,
  groupCartItemsByTaxRate,

};
