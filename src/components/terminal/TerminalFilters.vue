<template>
  <div class="overflow-hidden shadow-md max-w-[100%]">

    <q-tabs
      outside-arrows
      mobile-arrows
      inline-label
      v-model="tab"
      no-caps
      align="left"
      class="bg-white text-gray-700 shadow-md"
      :breakpoint="0"
    >
      <q-tab name="favorites" icon="bookmark_border" label="Favoriler" />

      <q-tab name="all" icon="apps" label="Tüm Ürünler" />

      <q-tab
        v-for="category in categories"
        :key="category.id"
        :label="category.attributes.name"
        :name="category.id"
      />

    </q-tabs>

  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useProductStore } from "src/stores/terminal/product-store";

const emit = defineEmits(["changed"]);

const productStore = useProductStore();

const tab = ref("all");

watch(tab, () => emit("changed", tab.value));

let categories = computed( () => productStore.unique_categories );

</script>
