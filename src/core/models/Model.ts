import Variant from './Variant';
import Product from './Product';
import { ModelNotFound } from '../exceptions/ModelError'
import { ModelType } from 'src/core/types/model.d';

function Model(model: ModelType){

  if(model?.type === 'products'){
    return { ...Product(model) }
  }

  if(model?.type === 'variants'){
    return { ...Variant(model) }
  }

  throw new ModelNotFound();

}

export default Model;

