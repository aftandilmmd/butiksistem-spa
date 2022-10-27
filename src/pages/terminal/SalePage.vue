<template>
  <q-page class='grid grid-cols-4'>

    <div class='col-span-3 flex flex-col bg-[#F5F5F5]'>

      <terminal-header
        :search-mode='searchMode'
        @search-mode-changed='searchModeChanged'
        class='relative z-20'
      />

      <transition name='slide'>
        <terminal-filters v-if='is_showing_filters' @changed='filterProductsByCategory' class='relative z-10' />
      </transition>

      <keep-alive>

        <q-tab-panels
          v-model='currentTab'
          keep-alive
          keep-alive-include='content,numpad'
          animated
          class='flex flex-col w-full flex-1 bg-transparent'
        >

          <q-tab-panel name='content' class='flex flex-col flex-1'>
            <product-grid :products='category_products' />
          </q-tab-panel>

          <q-tab-panel name='numpad' class='flex flex-col flex-1'>
            <terminal-numpad />
          </q-tab-panel>

        </q-tab-panels>

      </keep-alive>

      <terminal-tabs class='mt-auto' @changed='handleTabChange' />

    </div>

    <terminal-sidebar />

  </q-page>
</template>

<script>
import TerminalHeader from 'src/components/terminal/TerminalHeader.vue';
import TerminalFilters from 'src/components/terminal/TerminalFilters.vue';
import TerminalTabs from 'src/components/terminal/TerminalTabs.vue';
import TerminalSidebar from 'src/components/terminal/sidebar/TerminalSidebar.vue';
import TerminalNumpad from 'src/components/terminal/numpad/TerminalNumpad.vue';
import ProductGrid from 'src/components/terminal/product/ProductGrid.vue';
import Product from 'src/core/models/Product';
</script>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProductStore } from 'src/stores/terminal/product-store';

const productStore = useProductStore();

onMounted(() => productStore.getProducts());

const searchMode = ref('standard');
const currentTab = ref('content');
const category_filter = ref('all');

const category_products = computed( () => {

  if( category_filter.value === 'all'){
    return productStore.products
  }

  if( category_filter.value === 'favorites'){
    return productStore.favorites;
  }

  return cproducts.value

})

const cproducts = computed(() => productStore.products.filter( product => {
  let categories = Product(product).getCategories();
  if(categories.length > 0){
    return Product(product).getCategories().map(category => category.id).includes(category_filter.value)
  }
}))

const is_showing_filters = computed( () => searchMode.value === 'standard' && currentTab.value == 'content' );

function searchModeChanged(mode) {
  searchMode.value = mode;
}

function handleTabChange(tab) {
  currentTab.value = tab;
}

function filterProductsByCategory(category_id){
  category_filter.value = category_id;
}

onMounted(() => {
  window.addEventListener('paste', (event) => {
    let readCode = (event.clipboardData || window.clipboardData).getData( 'text' );
    console.log('Paste Event: ' + readCode);
  });
});
</script>
