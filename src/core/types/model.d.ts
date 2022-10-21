import { RemovableRef } from '@vueuse/core'

type DiscountType = 'percent' | 'fixed'

type TransactionType = 'custom' | 'discount'

type PaymentType = 'cash' | 'credit-card'

export interface ProductInterface{
  type : 'products',
  id   : number,

  attributes:{
    name  : string,
    price : number,
    tax_rate: number
  },

  relations?:{
    variants? : VariantInterface[],
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

  meta?:{
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

interface VariantTransactionInterface{
  amount: number,
  paymentType: PaymentType,
  hash_id?: string
}

interface CartInterface{
  items: RemovableRef<CartItemInterface[]>,
  customer: object,
  transactions: VariantTransactionInterface[]
}

interface CartItemInterface extends ProductInterface{
  relations:{
    variants : VariantInterface[]
  }
}
