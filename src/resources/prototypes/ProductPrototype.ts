import ApiDataProtoType from 'src/resources/prototypes/ApiDataPrototype'

const ProductPrototype = {

  get getVariants() {
    return this?.relations?.variants
  },

  get getFirstVariant() {
    return this?.relations?.variants[0]
  },

  get hasMultipleVariants() {
    return this?.relations?.variants?.length > 1
  },

  get getVariantsCount() {
    return this?.relations?.variants?.length
  },

  get getTaxRate() {
    return this?.attributes?.tax_rate || 18
  },

  get getTotalQuantity() {
    return this.getVariants.reduce(
      (total, variant) => (total + variant?.attributes?.quantity)
      , 0)
  },

  get hasQuantity() {
    return this.getQuantity > 0
  },

  get getImages() {
    return this?.relations?.images
  },

  get getFirstImage() {
    return this?.relations?.images[0]
  },

}

Object.setPrototypeOf(ProductPrototype, ApiDataProtoType)

export default ProductPrototype;
