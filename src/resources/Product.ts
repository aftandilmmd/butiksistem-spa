import { ProductType } from './../types/model.d';
import { v4 as uuidv4 } from 'uuid';

import ProductPrototype from 'src/resources/prototypes/ProductPrototype';

import { VariantType } from 'src/types/model'


export function Product(product: ProductType){

  product = product ?? {}

  Object.setPrototypeOf(product, ProductPrototype);

  return product;

}


export function newProductWithVariant(product: ProductType, variant: VariantType) {

  const product_id    = getProductId(product);
  const product_name  = getProductName(product);
  const product_price = getProductPrice(product);

  const variant_id    = getVariantId(variant);
  const variant_name  = getVariantName(variant);
  const variant_price = getVariantPrice(variant, product_price);
  const variant_quantity = 1;

  return {
    type : 'products',
    id   : product_id,

    attributes:{
      name  : product_name,
      price : product_price,
    },

    relations:{
      variants : [{
        type  : 'variants',
        id    : variant_id,
        attributes:{
          name     : variant_name,
          price    : variant_price,
          quantity : variant_quantity,
        },
        meta:{
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

export function hasProductMultipleVariants(product: ProductType) {
  return getProductVariantsCount(product) > 0;
}

function getProductVariants(product: ProductType) {
  return product?.relations?.variants || [];
}

function getProductVariantsCount(product: ProductType) {
	return getProductVariants(product).length;
}

function getProductFirstVariant(product: ProductType) {
  if(getProductVariantsCount(product) > 0){
    return product?.relations?.variants[0];
  }

  return {}
}

function getProductId(product: ProductType) {
  return product?.id;
}

function getProductTaxRate(product: ProductType, default_tax_rate = 18) {
  return product?.attributes?.tax_rate || default_tax_rate;
}

function getProductPrice(product: ProductType) {
  return product?.attributes?.price;
}

function getVariantId(variant: VariantType) {
  // TODO :: Create VariantPrototype
  return variant?.id;
}

function getVariantName(variant: VariantType) {
  return variant?.attributes?.name;
}

function getVariantQuantity(variant: VariantType) {
  return variant?.attributes?.quantity;
}

function hasVariantQuantity(variant: VariantType) {
  return variant?.attributes?.quantity > 0;
}

function getVariantMetaTransactionType(variant: VariantType) {
  return variant?.meta?.transactionType;
}

function getVariantMetaDiscountType(variant: VariantType) {
  return variant?.meta?.discountType;
}

function getVariantMetaAmount(variant: VariantType) {
  return variant?.meta?.amount;
}

function getVariantMetaHashId(variant: VariantType) {
  return variant?.meta?.hash_id;
}

function getVariantPrice(variant: VariantType, default_price = null) {
  return variant?.attributes?.price ?? default_price;
}

function getProductQuantity(product: ProductType) {
  return getProductVariants(product).reduce((total: number, variant: VariantType) => total + getVariantQuantity(variant), 0);
}

function hasProductQuantity(product: ProductType) {
  return getProductQuantity(product) > 0;
}

function getProductImages(product: ProductType) {
  return product?.relations?.images;
}

function getProductPrimaryImage(product: ProductType) {
  return 'https://images.pexels.com/photos/13428312/pexels-photo-13428312.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'; //getProductImages(product)[0];
}

function getProductName(product: ProductType) {
  return product?.attributes?.name;
}

export function getProductCategories(product: ProductType) {
  return product?.relations?.categories;
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
