import { CartItemInterface } from 'src/core/types/model.d';
import { v4 as uuidv4 } from 'uuid';
import { getCartItemCalculatedPrice } from 'src/resources/Cart';

function CartItemResource(item = {}): CartItemInterface {
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
        transaction_type: item.variant?.meta?.transaction_type || 'discount', // discount, custom
        discount_type: item.variant?.meta?.discount_type || 'percent', // percent, fixed
        amount: +item.variant?.meta?.amount || 0,
      },
    },
  };
}

function CartItemResourceCollection(items = []) {
  return items.map((item) => CartItemResource(item));
}

export { CartItemResource, CartItemResourceCollection };
