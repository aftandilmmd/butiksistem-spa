import { ProductInterface } from '../types/model.d';
import Variant from './Variant';

function Product(model: ProductInterface){

  // Getters
  function getId(){
    return model.id;
  }

  function getName(){
    return model.attributes.name;
  }

  function getPrice(){
    return model.attributes.price;
  }

  function getTaxRate(){
    return model.attributes.tax_rate || 18;
  }

  function getMainImage(){
    return model?.relations?.images[0]
  }

  function getQuantity(){

    if( model.attributes.quantity ) return model.attributes.tax_rate;

    return getVariants().reduce((total: number, variant) => total + Variant(variant).getQuantity(), 0);

  }

  function getVariantsCount(){
    return getVariants().length
  }

  function getFirstVariant(){
    return model?.relations?.variants[0]
  }


  // Relations
  function getVariants(){
    return model?.relations?.variants
  }

  function getImages(){
    return model?.relations?.images
  }

  function getCategories(){
    return model?.relations?.categories
  }


  // Check For Existence
  function hasQuantity(){
    return getQuantity() > 0;
  }

  function hasManyVariants(){
    return getVariantsCount() > 1
  }


  // Return Methods
  return {
    getId,
    getName,
    getPrice,
    getTaxRate,
    getMainImage,
    getQuantity,
    hasQuantity,

    getVariants,
    getImages,
    getCategories,

    hasManyVariants,
    getFirstVariant,
    getVariantsCount,
  }

}

export default Product;

