<template>
  <div class="h-screen overflow-hidden flex flex-col z-50">
    <div
      @click="emit('hide')"
      class="bg-gray-800/30 absolute left-0 top-0 right-0 bottom-0 z-10"
    ></div>

    <div class="relative z-20 flex flex-row items-stretch h-20 bg-blue-500">
      <span class="flex-1 text-white text-xl font-normal p-6 px-8">
        İşlem Seçiniz
      </span>

      <q-btn
        @click="emit('hide')"
        icon="close"
        text-color="grey-5"
        size="md"
        unelevated
        class="rounded-none text-gray-300 px-8"
      />
    </div>

    <div class="relative z-20 flex flex-col flex-1 bg-white">
      <q-scroll-area class="w-full h-full">
        <q-btn
          @click="isShowingCartParkDialog = true"
          no-caps
          align="left"
          text-color="grey-5"
          size="md"
          label="Satışı Park Et"
          unelevated
          class="text-base w-full rounded-none text-gray-900 py-6 px-8"
        />
        <q-separator />
        <q-btn
          no-caps
          align="left"
          size="md"
          label="Bilgi Fişi Yazdır"
          unelevated
          class="text-base w-full rounded-none text-gray-900 py-6 px-8"
        />
        <q-separator />
        <q-btn
          @click="isShowingCartDiscountDialog = true"
          no-caps
          align="left"
          size="md"
          label="Sepet İndirimi Yap"
          unelevated
          class="text-base w-full rounded-none text-gray-900 py-6 px-8"
        />
        <q-separator />
        <q-btn
          @click="isShowingCartNoteDialog = true"
          no-caps
          align="left"
          size="md"
          label="Not Ekle"
          unelevated
          class="text-base w-full rounded-none text-gray-900 py-6 px-8"
        />
        <q-separator />
        <q-btn
          no-caps
          align="left"
          size="md"
          label="Satış Personeli Seç"
          unelevated
          class="text-base w-full rounded-none text-gray-900 py-6 px-8"
        />
        <q-separator />
        <q-btn
          @click="resetCart"
          no-caps
          align="left"
          size="md"
          label="Sepeti Sıfırla"
          unelevated
          class="text-base w-full rounded-none text-red-600 py-6 px-8"
        />
        <q-separator />
      </q-scroll-area>
    </div>

  </div>

  <q-dialog v-model="isShowingCartDiscountDialog">
    <cart-discount-dialog />
  </q-dialog>

  <q-dialog v-model="isShowingCartNoteDialog">
    <cart-note-dialog />
  </q-dialog>

  <q-dialog v-model="isShowingCartParkDialog">
    <cart-park-dialog @parked="showCart" />
  </q-dialog>
</template>

<script>
import CartDiscountDialog from "./action/dialog/CartDiscountDialog.vue";
import CartNoteDialog from "./action/dialog/CartNoteDialog.vue";
import CartParkDialog from "./action/dialog/CartParkDialog.vue";
</script>

<script setup>
import { ref, inject } from "vue";
import { useCartStore } from "src/stores/terminal/cart-store";
import { useQuasar } from "quasar";

const actionPanel = inject("actionPanel");

const emit = defineEmits(["hide"]);

const cartStore = useCartStore();
const $q = useQuasar();

let isShowingCartDiscountDialog = ref(false);
let isShowingCartNoteDialog = ref(false);
let isShowingCartParkDialog = ref(false);

function resetCart() {
  cartStore.resetCart();

  emit("hide");

  $q.notify({
    type: "positive",
    icon: "delete_sweep",
    message: "Sepet boşaltıldı.",
    position: "bottom-right",
  });
}

function showCart() {
  actionPanel.complete();
}
</script>
