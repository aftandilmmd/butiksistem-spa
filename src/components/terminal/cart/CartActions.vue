<template>
  <div class="p-5 py-4 border-0 border-t border-solid border-gray-300">

    <div class="flex flex-col mb-3">

      <div class="flex h-[1.75rem]">

        <span class="w-1/2 text-base font-medium text-gray-400">
          Toplam Ürün / Ürün Çeşidi
        </span>

        <span class="w-1/2 text-right text-base font-medium text-gray-400">
          {{ cartStore.total_variants_count }} /
          {{ cartStore.getItemsCount }}
        </span>

      </div>

      <div v-for="tax in cartStore.calculated_taxes" :key="tax.rate" class="flex h-[1.75rem]" >

        <span class="w-1/2 text-base font-medium text-gray-400">
          %{{ tax.rate }}
        </span>

        <span class="w-1/2 text-right text-base font-medium text-gray-400">
          {{ Money(tax.tax_amount) }}
        </span>

      </div>

    </div>

    <div class="flex gap-3">

      <q-btn
        @click="emit('discount-click')"
        disabled
        unelevated
        icon="percent"
        text-color="blue-6"
        class="border border-solid border-blue-300 px-6 py-2"
      />

      <q-btn
        @click="emit('fastpay-click')"
        unelevated
        icon="payments"
        text-color="blue-6"
        class="border border-solid border-blue-300 px-6 py-2"
      />

      <q-btn
        @click="emit('confirm-click')"
        align="left"
        unelevated
        color="green-6"
        class="flex flex-1 px-5 py-2"
      >
        <div class="w-full flex items-center text-base">
          <span>Ödeme</span>
          <span class="ml-auto">{{ Money(cartStore.total_price) }}</span>
        </div>
      </q-btn>

    </div>

  </div>
</template>

<script setup>
import { useCartStore } from "src/stores/terminal/cart-store";
import { Money } from "src/utils/Money";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["discount-click", "fastpay-click", "confirm-click"]);

const cartStore = useCartStore();
</script>
