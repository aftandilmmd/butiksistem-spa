<template>
  <div class="w-full flex items-center flex-nowrap over overflow-hidden">

    <input
      type="text"
      :value="quantity"
      @click="showDetail"
      disabled
      class="w-10 h-10 text-center font-semibold text-lg rounded border border-solid border-gray-300 mr-4"
    />

    <div @click="showDetail" class="flex-1 flex flex-col items-start space-y-1">

      <span class="w-60 truncate overflow-hidden font-medium text-md text-gray-900">
        {{ product_name }}
      </span>

      <span v-if="variant_name" class="bg-blue-500 text-white font-normal text-sm rounded px-2">
        {{ variant_name }}
      </span>

      <span v-if="variant_stock_code" class="text-gray-500">
        {{ variant_stock_code }}
      </span>

      <span v-if="variant_note" class="text-gray-500">
        {{ variant_note }}
      </span>

    </div>

    <div class="flex items-start flex-shrink-0">

      <div @click="showDetail" class="font-medium text-md text-gray-800 mr-4 mb-1">

        <div v-if="isPriceUpdated" class="flex flex-col">

          <span class="text-gray-400 line-through">
            {{ total_quantity_price }}
          </span>

          <span class="text-blue-500">
            {{ total_updated_quantity_price }}
          </span>

        </div>

        <span v-else>
          {{ total_quantity_price }}
        </span>

      </div>

      <q-btn
        @click="remove"
        color="grey-3"
        text-color="grey-6"
        dense
        unelevated
        icon="delete"
        class="p-1 text-xs"
      />

    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";

import { Money } from "src/utils/Money";

import {
  getCartItemVariantName,
  getCartItemVariantQuantity,
  getCartItemVariantNote,
  getCartItemVariantStockCode,
  getCartItemTotalPrice,
  getCartItemUpdatedTotalPrice,
  isCartItemPriceUpdated,
} from "src/resources/Cart";

import { getProductName } from "src/resources/Product";

const emit = defineEmits(["remove", "show-detail"]);

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});


function remove() {
  emit("remove", props.item);
}

function showDetail() {
  emit("show-detail", props.item);
}

let product_name          = computed(() => getProductName(props.item));
let variant_note          = computed(() => getCartItemVariantNote(props.item));
let variant_stock_code    = computed(() => getCartItemVariantStockCode(props.item));
let variant_name          = computed(() => getCartItemVariantName(props.item));
let quantity              = computed(() => getCartItemVariantQuantity(props.item));
let isPriceUpdated        = computed(() => isCartItemPriceUpdated(props.item));
let total_quantity_price  = computed(() => Money(getCartItemTotalPrice(props.item)));
let total_updated_quantity_price = computed(() => Money(getCartItemUpdatedTotalPrice(props.item)));

</script>
