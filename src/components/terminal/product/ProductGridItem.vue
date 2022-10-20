<template>

  <div :title="getProductName(product)" class="group relative cursor-pointer rounded shadow transition-all duration-200">

    <div class="group relative w-full h-60 rounded overflow-hidden">

      <div @click="selectProduct(product)" class="duration-100 opacity-0 group-hover:opacity-100 bg-blue-300/50 absolute left-0 top-0 right-0 bottom-0"></div>

      <div v-if="hasProductQuantity(product)" @click="selectProduct(product)" class="flex flex-center -mt-12 bg-gray-400/60 absolute left-0 top-0 right-0 bottom-0" >

        <q-btn color="white" text-color="grey-9">{{ getProductQuantity(product) }} Adet</q-btn>

      </div>

      <img
        @click="selectProduct(product)"
        :alt="getProductName(product)"
        src="https://images.pexels.com/photos/13428312/pexels-photo-13428312.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        class="w-full h-full object-center object-cover bg-white"
      />

      <span v-if="! hasProductMultipleVariants(product)" class="absolute left-0 top-0 m-2 bg-blue-500 text-white font-normal text-sm rounded px-2">
        {{ getVariantName( getProductFirstVariant(product) ) }}
      </span>

      <q-btn unelevated icon="more_vert" size="sm" class="text-xs absolute px-2 right-0 top-0 m-2">

        <q-menu fit anchor="bottom right" self="top right">

          <q-list separator>

            <q-item @click="favorite(product)" clickable>

              <q-item-section avatar class="mr-0 min-w-0">
                <q-icon color="primary" name="favorite" size="xs" />
              </q-item-section>

              <q-item-section v-if="isFavorited(product.id)">
                Favorilerden Çıkar
              </q-item-section>

              <q-item-section v-else>Favorilere Ekle</q-item-section>

            </q-item>

            <q-item @click="showStock(product)" clickable>

              <q-item-section avatar class="mr-0 min-w-0">
                <q-icon color="primary" name="inventory" size="xs" />
              </q-item-section>

              <q-item-section>Stok Bilgisi</q-item-section>

            </q-item>

          </q-list>

        </q-menu>

      </q-btn>

      <div @click="selectProduct(product)" class="absolute overflow-hidden w-full px-4 py-3 bottom-0 bg-white flex flex-col">

        <h3 class="w-full truncate overflow-hidden text-sm font-bold text-gray-800 m-0">
          {{ getProductName(product) }}
        </h3>

        <p class="m-0 mt-1 text-sm text-gray-500 font-medium">
          {{ Money(getProductPrice(product)) }}
        </p>

      </div>

    </div>

    <div v-if="hasProductMultipleVariants(product)" class="group-hover:mt-[0.65rem] group-hover:shadow-md transition-all duration-200 absolute top-0 h-full left-[0.35rem] right-[0.35rem] bg-white shadow mt-[0.35rem] rounded -z-[2]"></div>

  </div>

  <q-dialog v-model="dialogs.variant" maximized>
    <product-variant-dialog
      :product="product"
      @close="dialogs.variant = false"
      @select-variant="selectVariant"
    />
  </q-dialog>

  <q-dialog v-model="dialogs.stock">
    <product-stock-dialog :product="stockProduct" />
  </q-dialog>

</template>

<script>
import ProductVariantDialog from 'src/components/terminal/product/dialog/ProductVariantDialog.vue';
import ProductStockDialog from 'src/components/terminal/product/dialog/ProductStockDialog.vue';
</script>

<script setup>

import { reactive, ref } from 'vue';
import { Money } from 'src/utils/Money';
import { useProductStore } from 'src/stores/terminal/product-store';
import { useCartStore } from 'src/stores/terminal/cart-store';

import {
	getProductName,
	getProductPrice,
	getProductQuantity,
	getProductFirstVariant,

	getVariantName,
  hasProductQuantity,
	hasVariantQuantity,
  hasProductMultipleVariants,
  newProductWithVariant,
} from 'src/resources/Product';


let emit  = defineEmits(['select-variant', 'show-stock']);
let props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const productStore = useProductStore();
const cartStore    = useCartStore();

const dialogs = reactive({
  variant: false,
  stock  : false,
})

const stockProduct = ref(false);

function selectProduct(product) {

  if ( hasProductMultipleVariants(product) ) {
    dialogs.variant = true;
    return;
  }

  selectVariant( getProductFirstVariant(product) );

}

function selectVariant(variant) {

  if (! hasVariantQuantity(variant) ) return;

  let cart_item = newProductWithVariant(props.product, variant);

  cartStore.add(cart_item)

  emit('select-variant', cart_item);

}

function showStock(product) {
  stockProduct.value = product;
  dialogs.stock = true;
}

function favorite(product) {

  if (isFavorited(product.id)) {
    productStore.unfavorite(product.id);
    return
  }

  productStore.favorite(product);
}

function isFavorited(product_id) {
  return productStore.isFavorited(product_id);
}

</script>