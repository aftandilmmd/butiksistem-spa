import { v4 as uuidv4 } from "uuid";

import ProductPrototype from 'src/resources/prototypes/ProductPrototype';

export function Product(product){

  product = product ?? {}

  Object.setPrototypeOf(product, ProductPrototype);

  return product;

}

export function newProductWithVariant(product, variant) {

  let product_id    = getProductId(product);
  let product_name  = getProductName(product);
  let product_price = getProductPrice(product);

  let variant_id    = getVariantId(variant);
  let variant_name  = getVariantName(variant);
  let variant_price = getVariantPrice(variant, product_price);
  let variant_quantity = 1;

  return {
    type : "products",
    id   : product_id,

    attributes:{
      name  : product_name,
      price : product_price,
    },

    relations:{
      variants : [{
        type  : "variants",
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
      type : "products",
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
      type  : "variants",
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

export function hasProductMultipleVariants(product) {
  return product?.relations?.variants?.length > 1;
}

function getProductVariants(product) {
  return product?.relations?.variants;
}

function getProductVariantsCount(product) {
	return getProductVariants(product).length;
}

function getProductFirstVariant(product) {
  return product?.relations?.variants[0];
}

function getProductId(product) {
  return product?.id;
}

function getProductTaxRate(product, default_tax_rate = 18) {
  return product?.attributes?.tax_rate || default_tax_rate;
}

function getProductPrice(product) {
  return product?.attributes?.price;
}

function getVariantId(variant) {
  // TODO :: Create VariantPrototype
  return variant?.id;
}

function getVariantName(variant) {
  return variant?.attributes?.name;
}

function getVariantQuantity(variant) {
  return variant?.attributes?.quantity;
}

function hasVariantQuantity(variant) {
  return variant?.attributes?.quantity > 0;
}

function getVariantMetaTransactionType(variant) {
  return variant?.meta?.transactionType;
}

function getVariantMetaDiscountType(variant) {
  return variant?.meta?.discountType;
}

function getVariantMetaAmount(variant) {
  return variant?.meta?.amount;
}

function getVariantMetaHashId(variant) {
  return variant?.meta?.hash_id;
}

function getVariantPrice(variant, default_price = null) {
  return variant?.attributes?.price ?? default_price;
}

function getProductQuantity(product) {
  return getProductVariants(product).reduce((total, variant) => total + getVariantQuantity(variant), 0);
}

function hasProductQuantity(product) {
  return getProductQuantity(product) > 0;
}

function getProductImages(product) {
  return product?.relations?.images;
}

function getProductPrimaryImage(product) {
  return 'https://images.pexels.com/photos/13428312/pexels-photo-13428312.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'; //getProductImages(product)[0];
}

function getProductName(product) {
  return product?.attributes?.name;
}

export function getProductCategories(product) {
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
