import VariantPrototype from 'src/resources/prototypes/VariantPrototype';

export function Variant(variant){

  variant = variant ?? {};

  Object.setPrototypeOf(variant, VariantPrototype);

  return variant;

}
