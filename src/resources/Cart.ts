import { VariantType } from './../types/Product';
import { ProductType } from './../types/model.d';
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
function getCartItemVariantName(cart_item) {
  return getProductFirstVariant(cart_item)?.attributes?.name;
}

function getCartItemVariantPrice(cart_item) {
  return getProductFirstVariant(cart_item)?.attributes?.price;
}

function getCartItemVariantQuantity(cart_item) {
  return getProductFirstVariant(cart_item)?.attributes?.quantity;
}

function getCartItemVariantNote(cart_item) {
  return getProductFirstVariant(cart_item)?.meta?.note;
}

function getCartItemVariantStockCode(cart_item) {
  return getProductFirstVariant(cart_item)?.attributes?.stock_code;
}


// Variant Attribute Setters
function setCartItemVariantMeta(cart_item: ProductType, meta = {}) {

  const variant: VariantType = getProductFirstVariant(cart_item);

  variant.meta = {
    hash_id : uuidv4(),
    transactionType: 'discount',
    discountType   : 'percent',
    amount         : null,
  }

  return cart_item;

}

function resetCartItemVariantDiscount(cart_item) {

  setCartItemVariantMeta(cart_item);

  return cart_item;

}

function removeCartItemDiscount(cart_item) {

  setCartItemVariantMeta(cart_item);

  return cart_item;

}

function removeCartItemVariantDiscount(cart_item) {

  setCartItemVariantMeta(cart_item);

  return cart_item;

}

function setCartItemVariant(cart_item, variant) {
  cart_item.relations.variants[0] = variant

  return cart_item;
}

function setCartItemVariantQuantity(variant, quantity) {
  variant.attributes.quantity = quantity;

  return variant;
}

function incrementCartItemQuantity(cart_item, add_quantity = 1) {

  const variant = getProductFirstVariant(cart_item);

  incrementCartItemVariantQuantity(variant, add_quantity);

  return cart_item;

}

function incrementCartItemVariantQuantity(variant, add_quantity = 1) {

  const old_quantity  = getVariantQuantity(variant);

  const new_quantity  = old_quantity + add_quantity

  setCartItemVariantQuantity(variant, new_quantity);

  return variant;

}

function filterCartByItemHashId(cart_items, cart_item_hash_id) {

  return cart_items.filter(item => getCartItemVariantMetaHashId(item) !== cart_item_hash_id)

}


// Variant Meta
function getCartItemVariantMetaTransactionType(item) {
  return getProductFirstVariant(item)?.meta?.transactionType;
}

function getCartItemVariantMetaDiscountType(item) {
  return getProductFirstVariant(item)?.meta?.discountType;
}

function getCartItemVariantMetaAmount(item) {
  return getProductFirstVariant(item)?.meta?.amount;
}

function getCartItemVariantMetaHashId(item) {
  return getProductFirstVariant(item)?.meta?.hash_id;
}

function getCartItemPrice(item) {

  return item?.attributes?.price;

}

function getCartItemCalculatedPrice(item) {
  const transactionType = getCartItemVariantMetaTransactionType(item);
  const discountType    = getCartItemVariantMetaDiscountType(item);
  const amount          = getCartItemVariantMetaAmount(item);
  const price           = getProductFirstVariant(item) ? getCartItemVariantPrice(item) : getCartItemPrice(item);

  if (transactionType === 'custom') {
    return amount;
  }

  if (transactionType === 'discount') {

    if (discountType === 'percent') {
      return price - (price * amount) / 100;
    }

    if (discountType === 'fixed') {
      return price - amount;
    }

  }

  return price;
}

function isCartItemPriceUpdated(item) {
  return getCartItemCalculatedPrice(item) !== getCartItemVariantPrice(item)
}

function getCartItemTotalPrice(item) {
  return getCartItemVariantQuantity(item) * getCartItemPrice(item)
}

function getCartItemUpdatedTotalPrice(item) {
  return getCartItemVariantQuantity(item) * getCartItemCalculatedPrice(item)
}

function ifItemExistsInCart(items, item) {

  const variant_id = getVariantId( getProductFirstVariant(item) );

  return new Promise((resolve, reject) => {

    const item_index = items.findIndex(cart_item => getVariantId( getProductFirstVariant(cart_item) ) === variant_id );

    if (item_index > -1 && variant_id) {
      return resolve( item_index );
    }

    reject('Item not found in items array.');
  });
}

function isCartItemVariantOverDiscounted(cart_item, variant) {

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

function getCartTotalPrice(items) {
  return sum(items.map(item => getCartItemVariantQuantity(item) * getCartItemCalculatedPrice(item)));
}

function getCartTotalVariantsCount(items) {
  return items.reduce( (total, item) => (total += getCartItemVariantQuantity(item)) ,0)
}

function filterCartItemsByTaxRate(items, tax_rate = 18) {
  return items.filter(item => item?.attributes?.tax_rate === tax_rate)
}

function groupCartItemsByTaxRate(items) {
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
