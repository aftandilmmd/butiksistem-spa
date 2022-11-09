import { OrderProductType } from 'src/core/types/order-types';

function OrderProduct(model: OrderProductType){

  function getId(){
    return model.id;
  }

  function getOrderId(){
    return model.attributes.order_id;
  }

  function getProductId(){
    return model.attributes.product_id
  }

  function getVariantId(){
    return model.attributes.variant_id;
  }

  function getPrice(){
    return model.attributes.price
  }

  function getQuantity(){
    return model.attributes.quantity
  }

  function getVariantName(){
    return model.attributes.variant_name
  }

  function getStockReloaded(){
    return model.attributes.stock_reload
  }

  function getStatusValue(){
    return model.computed.status_data.value
  }

  function getStatusTitle(){
    return model.computed.status_data.title
  }

  return {
    getId,
    getOrderId,
    getProductId,
    getVariantId,
    getPrice,
    getQuantity,
    getVariantName,
    getStockReloaded,
    getStatusValue,
    getStatusTitle,
  }

}

export default OrderProduct;
