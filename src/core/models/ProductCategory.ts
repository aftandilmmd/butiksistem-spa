import { ProductCategoryType } from '../types/product-category-type';

function ProductCategory(model: ProductCategoryType){

  // Getters
  function getId(){
    return model.id;
  }

  function getName(){
    return model.attributes.name;
  }

  function getDescription(){
    return model.attributes.description;
  }

  function getImage(){
    return model.attributes.image;
  }

  function getMetaDescription(){
    return model.attributes.meta_description;
  }

  function getMetaKeyword(){
    return model.attributes.meta_keyword;
  }

  function getParentId(){
    return model.attributes.parent_id;
  }

  function getSeoTitle(){
    return model.attributes.seo_title;
  }

  function getSortNum(){
    return model.attributes.sort_num;
  }

  function getStatus(){
    return model.attributes.status;
  }

  function getUrl(){
    return model.attributes.url;
  }

  function getVisibility(){
    return model.attributes.visibility;
  }

  // Return Methods
  return {
    getId,
    getName,
    getDescription,
    getImage,
    getMetaDescription,
    getMetaKeyword,
    getParentId,
    getSeoTitle,
    getSortNum,
    getStatus,
    getUrl,
    getVisibility,
  }

}

export default ProductCategory;
