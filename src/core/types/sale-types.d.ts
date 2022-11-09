import { ProductInterface } from 'src/core/types/model.d';

export type SaleSellerType = {
  type : 'sellers',
  id   : number,
  attributes: {
    first_name: string,
    last_name: string,
    full_name: string,
  }
}

export type SaleItemType = {
  type: 'sales',
  id: string,
  attributes: {
    customer_name: string,
    created_at: string,
    payment_data: {
      value: number,
      title: string,
    },
    payment_total: number
  },
  relations:{
    seller: SaleSellerType,
    products: ProductInterface[],
    sale_products: SaleProductType[],
    activities: SaleActivity[],
  },
  computed: {
    status_data: {
      value: number,
      title: string,
    },
    source_data: {
      value: number,
      title: string,
    },
    customer: {
      first_name: string,
      last_name: string,
      full_name: string,
      email: string,
      phone: null | string,
    }
  }
}

export type SaleProductType = {
  type: 'sale_products',
  id: number,
  attributes: {
      sale_id: number,
      product_id: null | number,
      variant_id: number,
      variant_name: string,
      quantity: number,
      price: number,
      stock_reload: number
  },
  computed: {
      status_data: {
          value: number,
          title: string
      }
  }
}

export type SaleActivityType = {
  type: 'sale_activities',
  id: number,
  attributes: {
      created_at: string,
  },
  computed: {
      status_data: {
          value: string,
          title: string
      }
  }
}
