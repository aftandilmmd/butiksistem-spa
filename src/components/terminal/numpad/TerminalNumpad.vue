<template>
  <div class="w-7/12 flex flex-col h-full border border-solid border-gray-300 overflow-hidden rounded-md mx-auto">
    <div class="w-full overflow-hidden text-gray-700 bg-gray-200 h-44 flex flex-center text-7xl font-light">
      <span>{{ numFormatted }}</span>
    </div>

    <div class="grid grid-cols-4 grid-rows-4 flex-1 bg-gray-200 gap-[5px] p-1">
      <q-btn
        @click="setNum('1')"
        unelevated
        flat
        rounded-0
        label="1"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-3 row-end-4 col-start-1 col-end-2"
      />
      <q-btn
        @click="setNum('2')"
        unelevated
        flat
        rounded-0
        label="2"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-3 row-end-4 col-start-2 col-end-3"
      />
      <q-btn
        @click="setNum('3')"
        unelevated
        flat
        rounded-0
        label="3"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-3 row-end-4 col-start-3 col-end-4"
      />
      <q-btn
        @click="setNum('4')"
        unelevated
        flat
        rounded-0
        label="4"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-2 row-end-3 col-start-1 col-end-2"
      />
      <q-btn
        @click="setNum('5')"
        unelevated
        flat
        rounded-0
        label="5"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-2 row-end-3 col-start-2 col-end-3"
      />
      <q-btn
        @click="setNum('6')"
        unelevated
        flat
        rounded-0
        label="6"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-2 row-end-3 col-start-3 col-end-4"
      />
      <q-btn
        @click="setNum('7')"
        unelevated
        flat
        rounded-0
        label="7"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-1 col-start-1 col-end-2"
      />
      <q-btn
        @click="setNum('8')"
        unelevated
        flat
        rounded-0
        label="8"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-1 col-start-2 col-end-3"
      />
      <q-btn
        @click="setNum('9')"
        unelevated
        flat
        rounded-0
        label="9"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-1 col-start-3 col-end-4"
      />
      <q-btn
        @click="setNum('0')"
        unelevated
        flat
        rounded-0
        label="0"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-4 row-end-5 col-start-1 col-end-2"
      />
      <q-btn
        @click="clear"
        no-caps
        unelevated
        flat
        rounded-0
        label="C"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-4 row-end-5 col-start-3 col-end-4"
      />
      <q-btn
        @click="toggleSide"
        unelevated
        flat
        rounded-0
        label="."
        class="bg-white rounded-md text-3xl text-gray-600 row-start-4 row-end-5 col-start-2 col-end-3"
      />
      <q-btn
        @click="removeLast"
        unelevated
        flat
        rounded-0
        icon="backspace"
        class="bg-white rounded-md text-2xl text-gray-600 row-start-1 row-end-3 col-start-4 col-end-5"
      />
      <q-btn
        @click="showEmptyProductPanel"
        no-caps
        unelevated
        flat
        rounded-0
        label="Ekle"
        class="bg-white rounded-md text-3xl text-gray-600 row-start-3 row-end-5 col-start-4 col-end-5"
      />
    </div>
  </div>

  <q-dialog v-model="dialogs.empty_product">
    <empty-product-dialog
      :price="price"
      @add="addProduct"
      class="w-full lg:w-4/12 xl:w-3/12"
    />
  </q-dialog>
</template>
<script setup lang="ts">
import EmptyProductDialog from 'src/components/terminal/numpad/dialog/EmptyProductDialog.vue';

import { ref, computed, onActivated, reactive } from 'vue';
import { Money } from 'src/utils/Money';
import { ProductInterface } from 'src/core/types/model'
import { v4 as uuidv4 } from 'uuid';
import { useCart } from 'src/core/composables/useCart';
import Product from 'src/core/models/Product';

const CartManager = useCart();

const price = ref('');

const dialogs = reactive({
  empty_product : false
})

let numFormatted = computed(() => {
  return Money(price.value);
});

function setNum(num) {
  price.value += '' + num;

  if (price.value.includes('.')) {
    price.value = price.value.slice(0, price.value.indexOf('.') + 3);
  }
}

function clear() {
  price.value = '';
}

function removeLast() {
  price.value = price.value.slice(0, -1);

  // If no decimal point
  if ((price.value % 1).toFixed(2) == '0.00') {
    price.value = price.value.replace('.', '');
  }
}

function showEmptyProductPanel() {
  dialogs.empty_product = true;
}

function addProduct(product) {
  const formated_product = formatProduct(product);
  const variant = Product(formated_product).getFirstVariant()
  CartManager.addItem(formated_product, variant);

  price.value = '';
}

function toggleSide() {
  if (price.value.includes('.')) return;

  if (price.value == '') price.value = 0;

  price.value = price.value + '.';
}

onActivated(() => {
  price.value = '';
});

function formatProduct(product): ProductInterface {
  return {
    type: 'products',
    id: -1 * (CartManager.getItems().length + 1),
    attributes:{
      name: 'Tanımsız ürün',
      price: Number(price.value),
      tax_rate: Number(product.tax_rate),
    },
    relations:{
      variants: [
        {
          type: 'variants',
          id: -1 * (CartManager.getItems().length + 1),
          attributes:{
            name: 'Tanımsız varyant',
            price: Number(price.value),
            quantity: 1,
          }
        }
      ]
    }
  }
}
</script>
