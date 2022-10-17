import { v4 as uuidv4 } from "uuid";

function ProductResource(product = {}) {
  return {
    hash_id: uuidv4(),
    id: product?.id,
    name: product?.name,
    tax: product?.tax,
    note: product?.note,
    stock: product?.stock,
    variant: {
      id: product?.variant?.id,
      name: product?.variant?.name,
      price: product?.variant?.price,
      salePrice: product?.variant?.salePrice,
      quantity: 1,
      hash_id: uuidv4(),
    },
  };
}

function ProductResourceCollection(items = []) {
  return items.map((item) => ProductResource(item));
}

export { ProductResource, ProductResourceCollection };
