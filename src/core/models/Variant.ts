import { v4 as uuidv4 } from 'uuid';
import { VariantInterface, VariantModelInterface } from 'src/core/types/model.d';

function Variant(model: VariantInterface): VariantModelInterface{

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

  function getBarcode() {
    return model?.attributes?.barcode;
  }

  function isTransactionCustom() {
    return getTransactionType() == 'custom';
  }

  function isTransactionDiscount() {
    return getTransactionType() == 'discount';
  }

  function isDiscountFixed() {
    return getDiscountType() == 'fixed';
  }

  function isDiscountPercent() {
    return getDiscountType() == 'percent';
  }

  function create() {
    return {
      type: 'variants',
      id: getId(),
      attributes: {
        name: getName(),
        price: getPrice(),
        quantity: 1,
      },
      meta: {
        hash_id: uuidv4()
      }
    }
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
    getBarcode,
    create,
    isTransactionCustom,
    isTransactionDiscount,
    isDiscountFixed,
    isDiscountPercent,
  }

}

export default Variant

