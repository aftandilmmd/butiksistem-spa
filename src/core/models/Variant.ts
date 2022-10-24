import { VariantInterface } from 'src/core/types/model.d';

function Variant(model: VariantInterface){

  function getId(){
    return model.id;
  }

  function getName(){
    return model.attributes.name;
  }

  function getPrice(){
    return model.attributes.price;
  }

  function getQuantity(){
    return model.attributes.quantity;
  }

  function hasQuantity(){
    return model.attributes.quantity > 0;
  }

  function getTransactionType(){
    return model?.meta?.transaction_type || 'discount';
  }

  function getDiscountType() {
    return model?.meta?.discount_type || 'percent';
  }

  function getAmount() {
    return model?.meta?.amount || 0;
  }

  function getHashId() {
    return model?.meta?.hash_id || '';
  }

  return {
    getId,
    getName,
    getPrice,
    getQuantity,
    hasQuantity,
    getTransactionType,
    getDiscountType,
    getAmount,
    getHashId,
  }

}

export default Variant

