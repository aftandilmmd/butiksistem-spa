import { StoreDefinition, StateTree, _GettersTree, _ActionsTree } from 'pinia';

export type DiscountType = 'percent' | 'fixed'

export type TransactionType = 'custom' | 'discount'

export type PaymentType = 'cash' | 'credit-card'

export type StoreType = StoreDefinition<string, StateTree , _GettersTree<StateTree>, _ActionsTree>;

export type ModelType = ProductInterface | VariantInterface | CartItemInterface;

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

  meta:{
    hash_id?: string,
    transaction_type?: 'custom' | 'discount',
    discount_type?: 'percent' | 'fixed',
    amount?: number | null,
    note?: string
  }

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

interface CartTransactionInterface{
  amount: number,
  paymentType: PaymentType,
  hash_id: string
}

interface CartInterface{
  items: CartItemInterface[],
  customer: CustomerInterface,
  shipping_address: AddressInterface,
  billing_address: AddressInterface,
  transactions: CartTransactionInterface[],
  discount: {
    transaction_type?: 'custom' | 'discount',
    discount_type?: 'percent' | 'fixed',
    amount?: number | null,
    note?: string
  }
}

type CartItemInterface = ProductInterface

interface CustomerInterface{
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  meta?: object
}

interface AddressInterface{
  city: string,
  district: string,
  address: string,
}

interface CartTaxRateInterface{
  rate: number,
  tax_rate: number,
  tax_amount: number,
  after_tax: number
}
interface ProductModelInterface{
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
  getCategories() : [] | undefined,
  hasManyVariants() : boolean,
  create(variant: VariantInterface | null) : ProductInterface,
}

interface VariantModelInterface{
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
  id   : string,
  cart: CartInterface,
  created_at: string,
}
