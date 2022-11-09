import { OrderActivity } from './../types/order-types.d';
import { useCart } from 'src/core/composables/useCart';
import { CartItemType, CartTaxRateInterface } from 'src/core/types/cart-types';
import { ProductInterface } from 'src/core/types/model.d';
import { OrderItemType, OrderProductType } from 'src/core/types/order-types';
import { v4 } from 'uuid';


const CartManager = useCart();

function OrderItem(model: OrderItemType){

  function getId(){
    return model.id;
  }

  function getCustomerName(){
    return model?.attributes?.customer_name;
  }

  function getCreatedAt(){
    return model?.attributes?.created_at
  }

  function getPaymentValue(){
    return model?.attributes?.payment_data?.value
  }

  function getPaymentTitle(){
    return model?.attributes?.payment_data?.title
  }

  function getPaymentTotal(){
    return model?.attributes?.payment_total
  }

  function getSeller(){
    return model?.relations?.seller
  }

  function getSellerId(){
    return getSeller().id;
  }

  function getSellerFirstName(){
    return getSeller()?.attributes?.first_name;
  }

  function getSellerLastName(){
    return getSeller()?.attributes?.last_name;
  }

  function getSellerFullName(){
    return getSeller()?.attributes?.full_name ?? '';
  }

  function getStatusTitle(){
    return model.computed.status_data.title;
  }

  function getCustomer(){
    return model?.computed?.customer;
  }

  function getProducts(): ProductInterface[]{
    // TODO: Product can be deleted. Handle this
    return model.relations?.products ?? [];
  }

  function getOrderProducts(): OrderProductType[]{
    return model.relations?.order_products ?? [];
  }

  function getOrderItems(): CartItemType[]{

    return getOrderProducts().map( (product: OrderProductType, index) => {

      return {
        type: 'cart_items',
        id: v4(),
        attributes: {
          quantity: product.attributes.quantity,
          product: {
            id: product.attributes.product_id ?? -1,
            name: getProductNameByIndex(index),
            price: product.attributes.price,
            tax_rate: getTaxRateByIndex(index),
          },
          variant: {
            id: product.attributes.variant_id,
            name: product.attributes.variant_name,
            price: product.attributes.price,
          }
        },
        meta: {
          pricing: {
            pricing_type: 'discount',
            discount_type: 'fixed',
            amount: null,
          },
          note: ''
        }
      }

    });

  }

  function getTaxPrices(): CartTaxRateInterface[] {
    return CartManager.getTaxPrices(getOrderItems());
  }

  function getTotalPrice(): number {
    return CartManager.getTotalPrice(getOrderItems());
  }

  function getVariantsCount(): number {
    return CartManager.getVariantsCount(getOrderItems());
  }

  function getProductNameByIndex(index){
    return getProducts()[index]?.attributes?.name
  }

  function getTaxRateByIndex(index){
    return getProducts()[index]?.attributes?.tax_rate
  }

  function getActivities(): OrderActivity[]{
    return model.relations?.activities ?? [];
  }

  return {
    getId,
    getCustomerName,
    getPaymentTitle,
    getPaymentValue,
    getCreatedAt,
    getPaymentTotal,
    getSeller,
    getSellerId,
    getSellerFirstName,
    getSellerLastName,
    getSellerFullName,
    getStatusTitle,
    getCustomer,
    getProducts,
    getOrderProducts,
    getOrderItems,
    getProductNameByIndex,
    getTaxRateByIndex,
    getTaxPrices,
    getTotalPrice,
    getVariantsCount,
    getActivities,
  }

}

export default OrderItem;
