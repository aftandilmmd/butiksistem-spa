import { DiscountType } from '../types/model.d';
import { TransactionType } from '../types/model.d';
import { VariantInterface } from '../types/model.d';
import { ProductInterface } from '../types/model.d';
import Product from './Product';
import Variant from './Variant';

import { v4 as uuidv4 } from 'uuid'

function CartItem(model: ProductInterface){

  function getId(): number {
    return Product(model).getId()
  }

  function getName(): string {
    return Product(model).getName()
  }

  function getVariantName(): string {
    return Variant(getVariant()).getName()
  }

  function getPrice(): number {
    return Variant(getVariant()).getPrice() ?? Product(model).getPrice()
  }

  function getVariant(): VariantInterface{
    return Product(model).getFirstVariant();
  }

  function getTransactionType(): TransactionType{
    return Variant( getVariant() ).getTransactionType()
  }

  function getDiscountType(): DiscountType{
    return Variant( getVariant() ).getDiscountType()
  }

  function getAmount(): number{
    return Variant( getVariant() ).getAmount()
  }

  function getUpdatedPrice() {

    const transaction_type = getTransactionType();
    const discount_type = getDiscountType();
    const amount = getAmount();
    const price = getPrice();

    if (amount === null) {
      return price;
    }

    if (transaction_type === 'custom') {
      return amount;
    }

    if (transaction_type === 'discount') {

      if (discount_type === 'percent') {
        return price - (price * amount) / 100;
      }

      if (discount_type === 'fixed') {
        return price - amount;
      }

    }

    return price;
  }

  function isPriceUpdated(): boolean {
    return getUpdatedPrice() !== getPrice()
  }

  function getQuantity(): number {
    return Variant( getVariant() ).getQuantity();
  }

  function getTotalPrice(): number {
    return getQuantity() *  getPrice();
  }

  function getUpdatedTotalPrice(): number {
    return getQuantity() *  getUpdatedPrice();
  }

  function getBarcode() {
    return Variant(getVariant()).getBarcode()
  }

  function getNote() {
    return getVariant().meta?.note;
  }

  function getHash() {
    return getVariant().meta?.hash_id;
  }

  function isOverDiscounted(): boolean {

    if (getTransactionType() === 'custom') {
      return getAmount() < 0;
    }

    if (getDiscountType() === 'percent' && getAmount() > 100) {
      return true;
    }

    if ( getDiscountType() == 'fixed' && getAmount() > getPrice() ) {
      return true;
    }

    return false;

  }

  function resetMeta() {

    const meta = {
      hash_id: uuidv4(),
      transaction_type: <TransactionType>'discount',
      discount_type: <DiscountType>'percent',
      amount: null,
    }

    return meta;

  }

  function removeDiscount() {
    model.relations.variants[0].meta = resetMeta();
    return model;
  }

  function setVariant(variant: VariantInterface) {
    model.relations.variants[0] = variant;
    return model;
  }

  // Return Methods
  return {
    getId,
    getPrice,
    getVariant,
    getTransactionType,
    getDiscountType,
    getAmount,
    getUpdatedPrice,
    isPriceUpdated,
    getQuantity,
    getTotalPrice,
    getUpdatedTotalPrice,
    getBarcode,
    getNote,
    getName,
    getVariantName,
    isOverDiscounted,
    resetMeta,
    removeDiscount,
    setVariant,
    getHash,
  }

}

export default CartItem;
