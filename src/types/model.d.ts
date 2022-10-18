export interface ProductType{
  type : 'products',
  id   : number,

  attributes:{
    name  : string,
    price : number,
    tax_rate: number
  },

  relations?:{
    variants? : VariantType[],
    categories? : [],
    images? : string[],
  }

}

export interface VariantType{
  type  : 'variants',
  id    : number,

  attributes:{
    name     : string,
    price    : number,
    quantity : number,
  },

  meta?:{
    hash_id?: string,
    transactionType?: 'custom' | 'discount',
    discountType?: 'percent' | 'fixed',
    amount?: number,
  }

}
