export type TransactionAmountType = 'remaining' | 'partial'

export type PaymentType = 'cash' | 'credit-card'

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

export interface CartTaxRateInterface{
  rate: number,
  tax_rate: number,
  tax_amount: number,
  after_tax: number
}

export interface CartTransactionInterface{
  amount: number,
  payment_type: PaymentType,
  id: string
}

export interface CartStateInterface{
  items: CartItemType[],
  customer: CustomerInterface,
  shipping_address: AddressInterface,
  billing_address: AddressInterface,
  transactions: CartTransactionInterface[],
  discount: PricingType
}

export interface CustomerInterface{
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  meta?: object
}

export interface AddressInterface{
  city: string,
  district: string,
  address: string,
}

export interface CartTaxRateInterface{
  rate: number,
  tax_rate: number,
  tax_amount: number,
  after_tax: number
}
