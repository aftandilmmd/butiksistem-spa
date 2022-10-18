import { v4 as uuidv4 } from 'uuid';
import { getCartItemCalculatedPrice } from 'src/resources/Cart';

function CartItemResource(item = {}) {
  return {
    id: item.id,
    name: item.name,
    note: item.note,

    variant: {
      id: item.variant?.id,
      hash_id: item.variant?.hash_id || uuidv4(),
      name: item.variant?.name,

      price: item.variant?.price,
      newPrice: getCartItemCalculatedPrice(item),
      quantity: item.variant?.quantity || 1,

      meta: {
        transactionType: item.variant?.meta?.transactionType || 'discount', // discount, custom
        discountType: item.variant?.meta?.discountType || 'percent', // percent, fixed
        amount: +item.variant?.meta?.amount || 0,
      },
    },
  };
}

function CartItemResourceCollection(items = []) {
  return items.map((item) => CartItemResource(item));
}

export { CartItemResource, CartItemResourceCollection };
