export interface PricingType{
  pricing_type: 'discount' | 'custom',
  discount_type: 'fixed' | 'percent',
  amount: number | null,
}

export type CartItemType = {
  type: 'cart_items',
  id: string,
  attributes: {
    quantity: number,
    product: {
      id: number,
      name: string,
      price: number,
      tax_rate: number,
    },
    variant: {
      id: number,
      name: string,
      price: number,
    }
  },
  meta: {
      pricing: PricingType,
      note: string
  }
}
