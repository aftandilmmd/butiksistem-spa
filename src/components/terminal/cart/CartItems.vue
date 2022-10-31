<template>
  <TransitionGroup name="list" tag="ul" class="w-full list-none p-0 m-0">
    <li
      v-for="item in cartStore.items"
      :hash="CartManager.item(item).getId()"
      :key="CartManager.item(item).getId()"
      class="flex cursor-pointer hover:bg-blue-50 space-y-4 divide-y border-gray-200 border-0 border-b border-solid"
    >
      <transition name="fade-out" mode="out-in">
        <cart-item
          :item="item"
          :key="CartManager.item(item).getQuantity()"
          @show-detail="showCartItemDetail"
          @remove="remove(item)"
          class="px-5 py-4"
        />
      </transition>
    </li>
  </TransitionGroup>

  <q-dialog v-model="dialogs.item_pricing">
    <cart-item-detail-dialog :item="itemDetail" class="max-w-[25rem]" />
  </q-dialog>
</template>

<script setup lang="ts">
import CartItem from 'src/components/terminal/cart/CartItem.vue';
import CartItemDetailDialog from 'src/components/terminal/cart/dialog/CartItemDetailDialog.vue';

import { ref, reactive } from 'vue';
import { confirmDialog } from 'src/utils/DialogHelper';
import { useCartStore } from 'src/stores/terminal/cart-store';
import { CartItemType } from 'src/core/types/cart-type';
import { useCart } from 'src/core/composables/useCart';

const CartManager = useCart();

const cartStore = useCartStore();

let itemDetail = ref<CartItemType>();
const dialogs = reactive({
  item_pricing: false,
})

function remove(item: CartItemType) {

  confirmDialog().then(() => {
    CartManager.removeItem( CartManager.item(item).getId() )
  });

}

function showCartItemDetail(item: CartItemType) {
  itemDetail.value = item;
  dialogs.item_pricing = true;
}
</script>
