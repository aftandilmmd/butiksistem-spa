import { ProductInterface } from 'src/core/types/model.d';

export type OrderSellerType = {
  type : 'sellers',
  id   : number,
  attributes: {
    first_name: string,
    last_name: string,
    full_name: string,
  }
}

export type OrderItemType = {
  type: 'orders',
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
    seller: OrderSellerType,
    products: ProductInterface[],
    order_products: OrderProductType[],
    activities: OrderActivity[],
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

export type OrderProductType = {
  type: 'order_products',
  id: number,
  attributes: {
      order_id: number,
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

export type OrderActivityType = {
  type: 'order_activities',
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
