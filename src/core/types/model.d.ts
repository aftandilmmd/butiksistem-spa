import { CartStateInterface } from 'src/core/types/cart-types';
import { StoreDefinition, StateTree, _GettersTree, _ActionsTree } from 'pinia';

export type DiscountType = 'percent' | 'fixed'

export type TransactionType = 'custom' | 'discount'

export type StoreType = StoreDefinition<string, StateTree , _GettersTree<StateTree>, _ActionsTree>;

export type ModelType = ProductInterface | VariantInterface;

export interface ProductInterface{
  type : 'products',
  id   : number,

  attributes:{
    name  : string,
    price : number,
    tax_rate: number
  },

  relations:{
    variants : VariantInterface[],
    categories? : [],
    images? : string[],
  }
}

export interface VariantInterface{
  type  : 'variants',
  id    : number,

  attributes:{
    name     : string,
    price    : number,
    quantity : number,
    barcode? : number,
  },
}

export interface CategoryInterface{
  type  : 'product_categories',
  id    : number,

  attributes:{
    description: string | null,
    image: string | null,
    meta_description: string | null,
    meta_keyword: string | null,
    name: string,
    parent_id: number | 0,
    seo_title: string | null,
    sort_num: number | null,
    status: boolean | null,
    url: string | null,
    visibility: boolean | true,
  },

}

export interface ProductModelInterface{
  getId() : number,
  getName() : string,
  getPrice() : number,
  getQuantity() : number,
  hasQuantity() : boolean,
  getTaxRate() : number,
  getMainImage() : string | null,
  getVariantsCount() : number,
  getFirstVariant() : VariantInterface,
  getVariants() : VariantInterface[],
  getImages() : string[],
  getCategories() : [],
  hasManyVariants() : boolean,
  create(variant: VariantInterface | null) : ProductInterface,
}

export interface VariantModelInterface{
  getId() : number,
  getName() : string,
  getPrice(default_price: number | null | undefined) : number,
  getQuantity() : number,
  hasQuantity() : boolean,
  getTransactionType() : TransactionType,
  getDiscountType() : DiscountType,
  getAmount() : number,
  getHashId() : string,
  getBarcode(): number | undefined,
  create() : VariantInterface,
  isTransactionCustom(): boolean,
  isTransactionDiscount(): boolean,
  isDiscountFixed(): boolean,
  isDiscountPercent(): boolean,
}

export interface ParkItemInterface{
  title: string,
  id   : string,
  cart: CartStateInterface,
  created_at: string,
}

export type PaginationLinkType = {
  url: string | null,
  label: string | number,
  active: boolean
}

export type PaginationMetaType = {
  current_page : number,
  from : number,
  last_page : number,
  links : PaginationLinkType[],
  path : string,
  per_page : number,
  to : number,
  total : number
}
