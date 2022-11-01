<template>

  <div :title="$(product).getName()" class="group relative cursor-pointer rounded shadow transition-all duration-200">

    <div class="group relative w-full h-60 rounded overflow-hidden">

      <div @click="selectProduct(product)" class="duration-100 opacity-0 group-hover:opacity-100 bg-blue-300/50 absolute left-0 top-0 right-0 bottom-0"></div>

      <div @click="selectProduct(product)" class="flex flex-center -mt-12 bg-gray-400/60 absolute left-0 top-0 right-0 bottom-0" >

        <q-btn v-if="$(product).hasQuantity()" color="white" text-color="grey-9">{{ $(product).getQuantity() }} Adet</q-btn>
        <q-btn v-else color="red">Tükendi</q-btn>

      </div>

      <img
        @click="selectProduct(product)"
        :alt="$(product).getName()"
        :src="Product(product).getMainImage()"
        loading="lazy"
        class="w-full h-full object-center object-cover bg-white"
      />

      <span v-if="! $(product).hasManyVariants()" class="absolute left-0 top-0 m-2 bg-blue-500 text-white font-normal text-sm rounded px-2">
        {{ $($(product).getFirstVariant()).getName() }}
      </span>

      <q-btn v-if="ProductManager.isFavorited(product)" @click="favorite(product)" unelevated icon="favorite" class="text-red-600 text-xs absolute px-2 right-10 top-0 m-2"></q-btn>

      <q-btn unelevated icon="more_vert" size="sm" class="text-xs absolute px-2 right-0 top-0 m-2">

        <q-menu fit anchor="bottom right" self="top right">

          <q-list separator>

            <q-item @click="favorite(product)" clickable>

              <q-item-section avatar class="mr-0 min-w-0">
                <q-icon color="primary" name="favorite" size="xs" />
              </q-item-section>

              <q-item-section v-if="ProductManager.isFavorited(product)">
                Favorilerden Çıkar
              </q-item-section>

              <q-item-section v-else>Favorilere Ekle</q-item-section>

            </q-item>

            <q-item @click="showStock" clickable>

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
          {{ $(product).getName() }}
        </h3>

        <p class="m-0 mt-1 text-sm text-gray-500 font-medium">
          {{ Money($(product).getPrice()) }}
        </p>

      </div>

    </div>

    <div v-if="$(product).hasManyVariants()" class="group-hover:mt-[0.65rem] group-hover:shadow-md transition-all duration-200 absolute top-0 h-full left-[0.35rem] right-[0.35rem] bg-white shadow mt-[0.35rem] rounded -z-[2]"></div>

  </div>

  <q-dialog v-model="dialogs.variant" maximized>
    <product-variant-dialog
      :product="product"
      @close="dialogs.variant = false"
      @select-variant="selectVariant"
    />
  </q-dialog>

  <q-dialog v-model="dialogs.stock">
    <product-stock-dialog :product="product" />
  </q-dialog>

</template>

<script setup lang="ts">
import ProductVariantDialog from 'src/components/terminal/product/dialog/ProductVariantDialog.vue';
import ProductStockDialog from 'src/components/terminal/product/dialog/ProductStockDialog.vue';
import { ProductInterface, VariantInterface, CartItemInterface } from 'src/core/types/model';

import { reactive } from 'vue';

import { Money } from 'src/utils/Money';
import $ from 'src/core/models/Model'
import Product from 'src/core/models/Product';
import Variant from 'src/core/models/Variant';
import { useCart } from 'src/core/composables/useCart';
import { useProduct } from 'src/core/composables/useProduct';
import { positiveNotify } from 'src/utils/Notify';

const props = defineProps<{ product: ProductInterface }>()
const emit  = defineEmits<{ (e: 'select-variant', value: ProductInterface | CartItemInterface): void }>()

const CartManager = useCart();
const ProductManager = useProduct();

const dialogs = reactive({
  variant: false,
  stock  : false,
})

function selectProduct(product: ProductInterface): void {

  if ( $(product).hasManyVariants() ) {
    dialogs.variant = true;
    return;
  }

  selectVariant( $(product).getFirstVariant() );

}

function selectVariant(variant: VariantInterface): void {

  if (! Variant(variant).hasQuantity() ) return;

  let cart_item = Product(props.product).create(variant);

  CartManager.addItem(props.product, variant);

  emit('select-variant', cart_item);

}

function showStock() {
  dialogs.stock = true;
}

function favorite(product: ProductInterface) {

  const product_name = Product(product).getName();

  if (ProductManager.isFavorited(product)) {
    ProductManager.unfavorite(product);
    positiveNotify(`${product_name} favorilerden çıkarıldı.`)
    return
  }

  ProductManager.favorite(product);
  positiveNotify(`${product_name} favorilere eklendi.`)
}

</script>
