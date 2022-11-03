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
      <q-tab :name="JSON.stringify({ id: -1, url: 'favorites' , name: 'Favori ürünler' })" icon="bookmark_border" :label="favorites_label" />

      <q-tab :name="JSON.stringify({ id: -1, url: 'all' , name: 'Tüm ürünler' })" icon="apps" :label="all_products_label" />

      <q-tab
        v-for="category in categories"
        :key="category.id"
        :label="category.attributes.name"
        :name="JSON.stringify({ id: ProductCategory(category).getId(), url: ProductCategory(category).getUrl(), name: ProductCategory(category).getName() })"
      />

    </q-tabs>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useProduct } from 'src/core/composables/useProduct';
import ProductCategory from 'src/core/models/ProductCategory';

const ProductManager = useProduct();
const emit = defineEmits(['changed']);

const tab = ref(JSON.stringify({ id: -1, url: 'all' , name: 'Tüm ürünler' }));

watch(tab, () => emit('changed', JSON.parse(tab.value)));

let categories = computed( () => ProductManager.getUniqueCategories() );
let favorites_label = computed( () => ProductManager.getFavoritesCount() > 0 ? `Favoriler (${ProductManager.getFavoritesCount()})` : 'Favoriler' );
let all_products_label = computed( () => ProductManager.getFavoritesCount() > 0 ? `Tüm Ürünler (${ProductManager.getProductsCount()})` : 'Tüm Ürünler' );

</script>
