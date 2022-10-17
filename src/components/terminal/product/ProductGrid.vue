<template>

  <product-grid-header @set-grid-count="setGridColCount" />

  <div class="flex flex-col flex-1">
    <q-scroll-area class="w-full h-full">
      <div class="p-4 xl:p-6 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 xl:gap-x-8"
        :class="{
          'lg:grid-cols-4': gridColsCount == 4,
          'lg:grid-cols-5': gridColsCount == 5,
          'lg:grid-cols-6': gridColsCount == 6,
          'lg:grid-cols-7': gridColsCount == 7,
        }"
      >
        <product-grid-item
          v-for="product in products"
          :product="product"
          :key="getProductId(product)"
        />
      </div>
    </q-scroll-area>
  </div>

</template>

<script>
import ProductGridItem from "src/components/terminal/product/ProductGridItem.vue";
import ProductGridHeader from "src/components/terminal/product/ProductGridHeader.vue";
</script>

<script setup>
import { ref } from "vue";
import { getProductId } from "src/resources/Product";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

const gridColsCount = ref(5);

function setGridColCount(count) {
  gridColsCount.value = count;
}

</script>
