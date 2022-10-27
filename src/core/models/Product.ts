import { ProductInterface, VariantInterface, ProductModelInterface } from 'src/core/types/model.d';
import Variant from './Variant';

function Product(model: ProductInterface): ProductModelInterface{

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
    return getImages()[0]
  }

  function getQuantity(){

    if( model.attributes?.quantity ) return model.attributes.quantity;

    return getVariants().reduce((total: number, variant) => total + Variant(variant).getQuantity(), 0);

  }

  function getVariantsCount(){
    return getVariants().length
  }

  function getFirstVariant(){
    return getVariants()[0]
  }

  // Relations
  function getVariants(){
    return model?.relations?.variants || []
  }

  function getImages(){
    return model?.relations?.images || []
  }

  function getCategories(){
    return model?.relations?.categories
  }

  function hasQuantity(){
    return getQuantity() > 0;
  }

  function hasManyVariants(){
    return getVariantsCount() > 1
  }

  // Setter
  function create(variant: VariantInterface | null){

    const variants = ! variant ? [] : <VariantInterface[]>[ Variant(variant).create() ]

    return <ProductInterface>{
      type: 'products',
      id: getId(),

      attributes: {
        name: getName(),
        price: getPrice(),
        tax_rate: 18
      },

      relations: {
        variants
      }
    };

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

    create,
  }

}

export default Product;
