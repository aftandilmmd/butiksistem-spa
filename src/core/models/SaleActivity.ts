import { SaleActivityType } from 'src/core/types/sale-types';

function SaleActivity(model: SaleActivityType){

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

export default SaleActivity;
