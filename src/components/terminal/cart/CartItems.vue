<template>
  <TransitionGroup name="list" tag="ul" class="w-full list-none p-0 m-0">
    <li
      v-for="item in cartStore.items"
      :hash="getCartItemVariantMetaHashId(item)"
      :key="getCartItemVariantMetaHashId(item)"
      class="flex cursor-pointer hover:bg-blue-50 space-y-4 divide-y border-gray-200 border-0 border-b border-solid"
    >
      <transition name="fade-out" mode="out-in">
        <cart-item
          :item="item"
          :key="getCartItemVariantQuantity(item)"
          @show-detail="showCartItemDetail"
          @remove="remove(item)"
          class="px-5 py-4"
        />
      </transition>
    </li>
  </TransitionGroup>

  <q-dialog v-model="isShowingDetailItemDialog">
    <cart-item-detail-dialog :item="itemDetail" class="max-w-[25rem]" />
  </q-dialog>
</template>

<script>
import CartItem from "src/components/terminal/cart/CartItem.vue";
import CartItemDetailDialog from "src/components/terminal/cart/dialog/CartItemDetailDialog.vue";
</script>

<script setup>
import { ref } from "vue";
import { confirmDialog } from "src/utils/DialogHelper";
import { useCartStore } from "src/stores/terminal/cart-store";
import { getCartItemVariantQuantity, getCartItemVariantMetaHashId } from "src/resources/Cart";

const cartStore = useCartStore();

let isShowingDetailItemDialog = ref(false);
let itemDetail = ref(null);

function remove(item) {

  let hash_id = getCartItemVariantMetaHashId(item);

  confirmDialog().then(() => {
    cartStore.removeItem(hash_id);
  });

}

function showCartItemDetail(item) {
  itemDetail.value = item;
  isShowingDetailItemDialog.value = true;
}
</script>
