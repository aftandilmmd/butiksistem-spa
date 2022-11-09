<template>
  <panel-wrapper>
    <template #title>Ürünler</template>

    <div class="mb-3">
      <ul class="relative">
        <li
          v-for="order_item in OrderItem(order).getOrderItems()"
          :key="order_item.id"
          class="rounded border border-solid border-gray-200 mb-2 hover:bg-gray-50 p-2"
        >
          <div class="flex">
            <div class="flex-1 flex flex-col items-start space-y-2">
              <div class="flex flex-row text-gray-700">
                <span class="font-medium">{{ CartItem(order_item).getQuantity() }}</span>
                <span class="px-2">&times;</span>
                <span>{{ CartItem(order_item).getName() }}</span>
              </div>
              <span class="bg-blue-50 text-blue-500 rounded px-3 py-1">
                {{ CartItem(order_item).getVariantName() }}
              </span>
            </div>
            <div class="flex-shrink-0">
              <span class="text-gray-800 font-medium">
                {{ Money(CartItem(order_item).getPrice()) }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-full flex items-center">
      <div class="w-full">
        <div v-if="OrderItem(order).getTaxPrices().length > 0" class="border-b border-gray-100 mb-3 py-3">
          <div class="flex mb-2">
            <span class="w-1/2 text-sm text-gray-400">KDV</span>
          </div>
          <div v-for="tax in OrderItem(order).getTaxPrices()" :key="tax.rate" class="flex">
            <span class="w-1/2 text-sm font-medium text-gray-400">
              %{{ tax.rate }}
            </span>

            <span class="w-1/2 text-right text-sm font-medium text-gray-400">
              {{ Money(tax.tax_amount) }}
            </span>
          </div>
        </div>

        <div class="flex items-center">
          <p class="m-0 p-0 flex-1 font-medium text-gray-800">
            Toplam Tutar
          </p>
          <p class="m-0 p-0 flex-1 text-right font-medium text-gray-800">
            {{ Money(OrderItem(order).getTotalPrice()) }}
          </p>
        </div>
      </div>
    </div>
  </panel-wrapper>

</template>

<script setup lang="ts">
import PanelWrapper from './PanelWrapper.vue';

import { Money } from 'src/utils/Money';
import OrderItem from 'src/core/models/OrderItem';
import CartItem from 'src/core/models/CartItem';

defineProps({
  order: {
    type: Object,
    default: ()=>({})
  }
})

</script>
