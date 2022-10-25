import Variant from './Variant';
import Product from './Product';
import { ModelNotFound } from '../exceptions/ModelError'
import { ProductModelInterface, ProductInterface, VariantInterface, VariantModelInterface } from 'src/core/types/model.d';

function Model(model: ProductInterface): ProductModelInterface;
function Model(model: VariantInterface): VariantModelInterface;

function Model(model: ProductInterface | VariantInterface): ProductModelInterface | VariantModelInterface {

  if(model.type == 'products'){
    return Product(model)
  }

  if(model.type == 'variants'){
    return Variant(model)
  }

  throw new ModelNotFound();

}

export default Model;

