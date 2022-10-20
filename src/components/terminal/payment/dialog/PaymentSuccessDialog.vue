<template>
  <div class="flex flex-col flex-center bg-white">
    <h1 class="text-4xl mb-16">
      <q-icon name="check_circle" color="green-5" class="mr-4"></q-icon>
      <span>Satış Başarılı</span>
    </h1>
    <div class="flex gap-4">
      <q-btn
        unelevated
        no-caps
        outline
        color="blue-7"
        padding="0.5rem 2rem"
        class="text-lg"
        label="Bilgi Fişi Yazdır"
      />

      <q-btn
        unelevated
        no-caps
        outline
        color="blue-7"
        padding="0.5rem 2rem"
        class="text-lg"
        label="Fatura Yazdır"
      />

      <q-btn
        @click="restart"
        unelevated
        no-caps
        color="blue-7"
        padding="0.5rem 2rem"
        class="text-lg"
        label="Yeni Satış Başlat"
        v-close-popup
      />
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "src/stores/terminal/cart-store";
let cartStore = useCartStore();

const emit = defineEmits(["restart"]);

function restart() {
  cartStore.reset();
  emit("restart");
}
</script>
