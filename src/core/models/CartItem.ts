import { VariantInterface, DiscountType, TransactionType } from 'src/core/types/model';
import { CartItemType } from 'src/core/types/cart-types';
import Variant from './Variant';

function CartItem(model: CartItemType){

  function getId(): string {
    return model.id;
  }

  function getName(): string {
    return model.attributes.product.name ?? '<Silinmiş Ürün>';
  }

  function getVariantName(): string {
    return model.attributes.variant.name;
  }

  function getPrice(): number {
    return model.attributes.variant.price ?? model.attributes.product.price;
  }

  function getVariant(){
    return model.attributes.variant;
  }

  function getTaxRate(){
    return model.attributes.product.tax_rate;
  }

  function getTransactionType(): TransactionType{
    return model.meta.pricing.pricing_type;
  }

  function getDiscountType(): DiscountType{
    return model.meta.pricing.discount_type;
  }

  function getAmount(): number | null{
    return model.meta.pricing.amount;
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
    return model.attributes.quantity;
  }

  function getTotalPrice(): number {
    return getQuantity() *  getPrice();
  }

  function getUpdatedTotalPrice(): number {
    return getQuantity() *  getUpdatedPrice();
  }

  function getBarcode() {
    return 'NOT_AVAILABLE';
  }

  function getNote() {
    return model.meta.note;
  }

  function getHash() {
    return model.id;
  }

  function isOverDiscounted(): boolean {
    const amount = getAmount() ?? 0;

    if (getTransactionType() === 'custom') {
      return amount < 0;
    }

    if (getDiscountType() === 'percent' && amount > 100) {
      return true;
    }

    if ( getDiscountType() == 'fixed' && amount > getPrice() ) {
      return true;
    }

    return false;

  }

  function removeDiscount() {
    model.meta.pricing = {
      pricing_type: 'discount',
      discount_type: 'percent',
      amount: null,
    }
    return model;
  }

  function setVariant(variant: VariantInterface) {
    model.attributes.variant = {
      id: Variant(variant).getId(),
      name: Variant(variant).getName(),
      price: Variant(variant).getPrice( getPrice() ),
    }
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
    removeDiscount,
    setVariant,
    getHash,
    getTaxRate,
  }

}

export default CartItem;
