import { OrderActivityType } from 'src/core/types/order-types';

function OrderActivity(model: OrderActivityType){

  function getId(){
    return model.id;
  }

  function getCreatedAt(){
    return model.attributes.created_at;
  }

  function getStatusValue(){
    return model.computed.status_data.value
  }

  function getStatusTitle(){
    return model.computed.status_data.title
  }

  return {
    getId,
    getCreatedAt,
    getStatusValue,
    getStatusTitle,
  }

}

export default OrderActivity;
