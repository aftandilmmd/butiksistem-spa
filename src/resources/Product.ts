import { VariantInterface, ProductInterface, CategoryInterface, DiscountType, TransactionType } from 'src/core/types/model.d';

import { v4 as uuidv4 } from 'uuid';

import ProductPrototype from 'src/resources/prototypes/ProductPrototype';


export function Product(product: ProductInterface) {

  product = product ?? {}

  Object.setPrototypeOf(product, ProductPrototype);

  return product;

}

function getProductId(product: ProductInterface): number {
  return product?.id;
}

function getProductName(product: ProductInterface): string {
  return product?.attributes?.name || '';
}

function getProductTaxRate(product: ProductInterface, default_tax_rate = 18) {
  return product?.attributes?.tax_rate || default_tax_rate;
}

function getProductPrice(product: ProductInterface) {
  return product?.attributes?.price;
}

export function newProductWithVariant(product: ProductInterface, variant: VariantInterface): ProductInterface {

  const product_id = getProductId(product);
  const product_name = getProductName(product);
  const product_price = getProductPrice(product);

  const variant_id = getVariantId(variant);
  const variant_name = getVariantName(variant);
  const variant_price = getVariantPrice(variant, product_price);
  const variant_quantity = 1;

  return {
    type: 'products',
    id: product_id,

    attributes: {
      name: product_name,
      price: product_price,
      tax_rate: 18
    },

    relations: {
      variants: [{
        type: 'variants',
        id: variant_id,
        attributes: {
          name: variant_name,
          price: variant_price,
          quantity: variant_quantity,
        },
        meta: {
          hash_id: uuidv4()
        }
      }]
    }

  };

  /*
  let cart_item = {

    product: {
      type : 'products',
      id : getProductId(props.product),
      attributes : {
        name : getProductName(props.product),
        price : getProductPrice(props.product),
      },
      relations: {
        variants: []
      }
    },

    variant: {
      type  : 'variants',
      id    : getVariantId(variant),
      attributes:{
        name     : getVariantName(variant),
        price    : getVariantPrice(variant, product_price),
        quantity : 1,
      },
      meta:{
        hash_id: uuidv4()
      }
    }

  };
  */


}

export function hasProductMultipleVariants(product: ProductInterface): boolean {
  return getProductVariantsCount(product) > 0;
}

function getProductVariants(product: ProductInterface): VariantInterface[] {
  return product?.relations?.variants || [];
}

function getProductVariantsCount(product: ProductInterface): number {
  return getProductVariants(product).length;
}

function getProductFirstVariant(product: ProductInterface): VariantInterface {
  return product?.relations?.variants[0] ?? {}
}

function getVariantId(variant: VariantInterface): number {
  return variant?.id;
}

function getVariantName(variant: VariantInterface): string {
  return variant?.attributes?.name;
}

function getVariantQuantity(variant: VariantInterface): number {
  return variant?.attributes?.quantity;
}

function hasVariantQuantity(variant: VariantInterface): boolean {
  return variant?.attributes?.quantity > 0;
}

function getVariantMetaTransactionType(variant: VariantInterface): TransactionType {
  return variant?.meta?.transaction_type || 'discount';
}

function getVariantMetaDiscountType(variant: VariantInterface): DiscountType {
  return variant?.meta?.discount_type || 'percent';
}

function getVariantMetaAmount(variant: VariantInterface): number {
  return variant?.meta?.amount || 0;
}

function getVariantMetaHashId(variant: VariantInterface): string {
  return variant?.meta?.hash_id || '';
}

function getVariantPrice(variant: VariantInterface, default_price = null): number {
  return variant?.attributes?.price ?? default_price;
}

function getProductQuantity(product: ProductInterface) {
  return getProductVariants(product).reduce((total: number, variant: VariantInterface) => total + getVariantQuantity(variant), 0);
}

function hasProductQuantity(product: ProductInterface): boolean {
  return getProductQuantity(product) > 0;
}

function getProductImages(product: ProductInterface): string[] {
  return product?.relations?.images || [];
}

function getProductPrimaryImage(product: ProductInterface) {
  return 'https://images.pexels.com/photos/13428312/pexels-photo-13428312.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'; //getProductImages(product)[0];
}

export function getProductCategories(product: ProductInterface): CategoryInterface[] {
  return product?.relations?.categories || [];
}

export {
  getProductId,
  getProductPrice,
  getProductName,
  getProductQuantity,
  getProductImages,
  getProductPrimaryImage,
  getProductFirstVariant,
  getProductVariantsCount,
  getProductTaxRate,
  hasProductQuantity,

  // Variants
  getProductVariants,
  getVariantId,
  getVariantName,
  getVariantQuantity,
  getVariantPrice,
  getVariantMetaTransactionType,
  getVariantMetaDiscountType,
  getVariantMetaAmount,
  getVariantMetaHashId,
  hasVariantQuantity,
};
